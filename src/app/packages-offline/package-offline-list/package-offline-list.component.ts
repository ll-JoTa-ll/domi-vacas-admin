import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { VoucherService } from 'src/app/vouchers/shared/voucherService.model';

@Component({
  selector: 'app-package-offline-list',
  templateUrl: './package-offline-list.component.html',
  styleUrls: ['./package-offline-list.component.css'],
  providers: [NgxSpinnerService]
})
export class PackageOfflineListComponent implements OnInit {

  searching: boolean;
  displayedColumns: string[] = ['status' , 'transactionCode' , 'transactionDate', 'expireDate',
                   'fullName', 'email' ,
                  'phone', 'package', 'amount', 'paymentStatus', 'paymentCode', 'paymentMethod',
                  'paymentDate','currency',
                  'Detalle'];
  dataSource;
  userId: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private spinner: NgxSpinnerService, private session: SessionService,private router: Router,public dialog: MatDialog,
      private service: VoucherService,private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    if (!this.userId || this.userId === '') {
      this.router.navigate(['']);
    } else {
      this.search();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  detailService(transacionId) {
    this.spinner.show();
    this.service.getPackageDetail(transacionId).subscribe(
      x => {
        const data = x;
        this.session.setPackageDetail(x);
        this.spinner.hide();
        /* this.showDialogPassenger(data); */
        this.router.navigate(['package-offline-detail']);
      },
      err => {
        console.log('error: ' + err);

      },
      () => {

      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  

  back(){
    this.router.navigate(['package/list'])
  }

  search() {
    this.searching = true;
    this.service.ListPackages().subscribe(
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
