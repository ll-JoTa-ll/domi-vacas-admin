import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogInfoPassComponent } from 'src/app/shared/components/dialog-info-pass/dialog-info-pass.component';
import { SessionService } from 'src/app/shared/services/session.service';
import { VoucherService } from 'src/app/vouchers/shared/voucherService.model';

@Component({
  selector: 'app-package-offline-detail',
  templateUrl: './package-offline-detail.component.html',
  styleUrls: ['./package-offline-detail.component.css'],
  providers: [DialogInfoPassComponent,NgxSpinnerService]
})
export class PackageOfflineDetailComponent implements OnInit {

  data;
  cip = true;
  constructor(public dialog: MatDialog, private session: SessionService, private router: Router,
    private service: VoucherService,private _snackBar: MatSnackBar,private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.data = this.session.getPackageDetail();
  }

  back(){
    this.router.navigate(['package-offline-list']);
  }

  showDialogPass(message: any) {
    const dialogRef = this.dialog.open(DialogInfoPassComponent, {
      data: message,
      height: 'auto',
      width: 'auto',
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  update(valor){
    this.spinner.show();
    this.service.UpdatePayment(valor).subscribe(
      result => {
        if (result.confirmation) {
          this.spinner.hide();
          this.cip = false;
          this.openSnackBar('Se ha generado exitosamente el codigo CIP','OK');
        } else {
          this.spinner.hide();
          this.cip = true;
          this.openSnackBar('Problemas al generar codigo CIP','OK');
        }
      }
    )
  }

}
