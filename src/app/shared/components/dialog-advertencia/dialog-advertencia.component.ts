import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PostInvitationPartnerClubService } from 'src/app/partnerClub/shared/postInvitationPartnerClub.service';
import { SessionService } from '../../services/session.service';
import { DialogSendComponent } from '../dialog-send/dialog-send.component';

@Component({
  selector: 'app-dialog-advertencia',
  templateUrl: './dialog-advertencia.component.html',
  styleUrls: ['./dialog-advertencia.component.css'],
  providers: [PostInvitationPartnerClubService, NgxSpinnerService]
})
export class DialogAdvertenciaComponent implements OnInit {
  textTile = '¡Un Momento!';
  textSubtitle = 'Uno o mas usuarios seleccionados ya han sido invitados. Si desea proceder a invitarlos nuevamente, continue.';
  img = 'assets/images/partner/pregunta.svg';


  constructor(public dialogRef: MatDialogRef<DialogAdvertenciaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
              private enviarInvitacion: PostInvitationPartnerClubService, private spinner: NgxSpinnerService,
              public dialog: MatDialog,private sessionService: SessionService
) { }

  ngOnInit() {
  }

  home(){
    this.sessionService.setRefreshTable(false);
    this.dialogRef.close();
  }

  showDialogRedirection(message: any) {
    const dialogRef = this.dialog.open(DialogSendComponent, {
      disableClose: true,
      data: message
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  send(){
    this.spinner.show();

    this.enviarInvitacion.enviaInvitacion(this.data).subscribe(
      result => {
        if (result === true) {
          this.sessionService.setRefreshTable(true);
          this.spinner.hide();
          this.dialogRef.close();
          this.showDialogRedirection(result);
        } else {
          this.spinner.hide();
          this.dialogRef.close();
          this.showDialogRedirection(result);
        }
      },
      () => {
        this.spinner.hide();
      }
    )
  }

}
