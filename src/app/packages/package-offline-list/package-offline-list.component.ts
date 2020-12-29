import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/shared/services/session.service';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'app-package-offline-list',
  templateUrl: './package-offline-list.component.html',
  styleUrls: ['./package-offline-list.component.css'],
  providers: [PackageService , NgxSpinnerService]
})
export class PackageOfflineListComponent implements OnInit {


  searching: boolean;
  displayedColumns: string[] = ['status', 'transactionCode', 'transactionDate',
    'fullName', 'email',
    'phone', 'package', 'amount', 'payementStatus', 'paymentMethod',
    'payementDate', 'currency',
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

  back(){
    this.router.navigate(['package/list']);
  }

  detailService(transacionId) {
    this.spinner.show();
    this.packageService.packagesOfflineDetail(transacionId).subscribe(
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  search() {
    this.searching = true;
    this.packageService.listPackagesOffline().subscribe(
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
