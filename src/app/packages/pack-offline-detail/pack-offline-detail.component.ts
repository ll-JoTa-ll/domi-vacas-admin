import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Toaster } from 'ngx-toast-notifications';
import { SessionService } from 'src/app/shared/services/session.service';
import { PackageService } from '../shared/package.service';

@Component({
  selector: 'app-pack-offline-detail',
  templateUrl: './pack-offline-detail.component.html',
  styleUrls: ['./pack-offline-detail.component.css'],
  providers: [PackageService , NgxSpinnerService, Toaster]
})
export class PackOfflineDetailComponent implements OnInit {

  data;
  messageS;
  confir;
  userId;
  constructor(public dialog: MatDialog, private session: SessionService, private router: Router,
              private packageService: PackageService, private spinner: NgxSpinnerService,
              private toaster: Toaster) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('userId');
    if (!this.userId || this.userId === '') {
      this.router.navigate(['']);
    } else {
      this.data = this.session.getPackageDetail();
    }

  }

  back(){
    this.router.navigate(['package-offline-list']);
  }

  showToast() {
    let types;
    if (this.confir === true) {
      types = 'success';
      this.toaster.open({
        autoClose: false,
        position: 'bottom-center',
        text: this.messageS,
        caption: 'Felicidades',
        type: types,
      });
    } else {
      types = 'danger';
      this.toaster.open({
        autoClose: false,
        position: 'bottom-center',
        text: this.messageS,
        caption: 'Error',
        type: types,
      });
    }
  }

  showDialogPackage(transacionId){
    this.spinner.show();
    this.packageService.updatePaymentOffline(transacionId).subscribe(
      x => {
        this.confir = x.confirmation;
        const data = x;
        this.messageS = x.message;
        this.showToast();
        this.spinner.hide();
        /* this.showDialogPassenger(data); */

      },
      err => {
        console.log('error: ' + err);
        this.spinner.hide();
      },
      () => {

      }
    );
  }

}
