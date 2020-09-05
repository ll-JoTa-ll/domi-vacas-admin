import { Component, OnInit, ViewChild } from '@angular/core';
import { PackageService } from 'src/app/packages/shared/package.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogHotelInfoComponent } from 'src/app/shared/components/dialog-hotel-info/dialog-hotel-info.component';
import { DialogPassengerInfoComponent } from 'src/app/shared/components/dialog-passenger-info/dialog-passenger-info.component';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.css'],
  providers: [PackageService]
})
export class ReportsListComponent implements OnInit {

  searching: boolean;
  displayedColumns: string[] = [ 'product', 'currency' , 'hotel', 'pasajeros',
                  'payementType', 'payementStatus', 'transactionDate', 'sector', 'totalAmount'];
  dataSource;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private packageService: PackageService, public dialog: MatDialog) { }

  ngOnInit() {
    this.search();

  }

  showDialogFees(message: string) {
    const dialogRef = this.dialog.open(DialogHotelInfoComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showDialogPassenger(message: any[]) {
    const dialogRef = this.dialog.open(DialogPassengerInfoComponent, {
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {
    });
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
