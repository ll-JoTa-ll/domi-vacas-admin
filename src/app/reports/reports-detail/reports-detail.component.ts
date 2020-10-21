import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogHotelInfoComponent } from 'src/app/shared/components/dialog-hotel-info/dialog-hotel-info.component';
import { DialogInfoComponent } from 'src/app/shared/components/dialog-info/dialog-info.component';
import { DialogTableComponent } from 'src/app/shared/components/dialog-table/dialog-table.component';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-reports-detail',
  templateUrl: './reports-detail.component.html',
  styleUrls: ['./reports-detail.component.css']
})
export class ReportsDetailComponent implements OnInit {


  data;
  constructor(public dialog: MatDialog, private session: SessionService, private router: Router) { }

  ngOnInit() {
    this.data = this.session.getReportDetail();
  }

  back(){
    this.router.navigate(['reports']);
  }

  showDialogFees(message: any) {
    const dialogRef = this.dialog.open(DialogTableComponent, {
      data: message,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showDialogHotel(message: any) {
    const dialogRef = this.dialog.open(DialogInfoComponent, {
      data: message,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showDialogPackage(message: any) {
    const dialogRef = this.dialog.open(DialogHotelInfoComponent, {
      data: message,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
