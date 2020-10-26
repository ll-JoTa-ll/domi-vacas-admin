import { Component, OnInit, ViewChild } from '@angular/core';
import { PackageService } from 'src/app/packages/shared/package.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogHotelInfoComponent } from 'src/app/shared/components/dialog-hotel-info/dialog-hotel-info.component';
import { DialogPassengerInfoComponent } from 'src/app/shared/components/dialog-passenger-info/dialog-passenger-info.component';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogTableComponent } from 'src/app/shared/components/dialog-table/dialog-table.component';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
  providers: [PackageService , NgxSpinnerService]
})
export class ReportsListComponent implements OnInit {

  searching: boolean;
  displayedColumns: string[] = ['status' , 'transactionCode' , 'transactionDate',
                   'names', 'email' ,
                  'phone', 'destination', 'totalAmount', 'adminCharges', 'payementStatus', 'payementType',
                  'payementDate','creditCard', 'currency', 'order',
                  'Detalle'];
  dataSource;
  userId: string;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private packageService: PackageService, public dialog: MatDialog, private router: Router,
              private spinner: NgxSpinnerService, private session: SessionService) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    if (!this.userId || this.userId === '') {
      this.router.navigate(['']);
    } else {
      this.search();
    }
  }

  showDialogFees(message: any) {
    const dialogRef = this.dialog.open(DialogHotelInfoComponent, {
      data: message,
      height: 'auto',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  back(){
    this.router.navigate(['package/list']);
  }

  showDialogPassenger(message: any) {
    const dialogRef = this.dialog.open(DialogTableComponent, {
      data: message,
      height: 'auto',
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  detailService(transacionId) {
    this.spinner.show();
    this.packageService.listServicesDetail(transacionId).subscribe(
      x => {
        const data = x;
        this.session.setReportDetail(x);
        this.spinner.hide();
        /* this.showDialogPassenger(data); */
        this.router.navigate(['reports-detail']);
      },
      err => {
        console.log('error: ' + err);

      },
      () => {

      }
    );
  }

  detailServicePassenger(transacionId) {
    this.spinner.show();
    this.packageService.listServicesDetail(transacionId).subscribe(
      x => {
        const data = x;
        this.spinner.hide();
        this.showDialogFees(data);
      },
      err => {
        console.log('error: ' + err);

      },
      () => {

      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  search() {
    this.searching = true;
    this.packageService.listServices().subscribe(
      x => {
        this.dataSource = x;
        this.dataSource = new MatTableDataSource(this.dataSource);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.log('error: ' + err);
        this.searching = false;
      },
      () => {
        this.searching = false;
      }
    );
  }


}
