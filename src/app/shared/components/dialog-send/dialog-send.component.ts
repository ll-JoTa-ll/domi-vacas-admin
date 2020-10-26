import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-send',
  templateUrl: './dialog-send.component.html',
  styleUrls: ['./dialog-send.component.css']
})
export class DialogSendComponent implements OnInit {

  textTile;
  textSubtitle;
  img;

  constructor(public dialogRef: MatDialogRef<DialogSendComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private router: Router
) { }

  ngOnInit() {
    if (this.data === true){
      this.textTile = '¡Perfecto!';
      this.textSubtitle = 'Se ha enviado la invitación correctamente a los usuarios seleccionados.';
      this.img = 'assets/images/partner/send.svg';
    } else {
      this.textTile = '¡Lo siento!';
      this.textSubtitle = 'Ocurrió un problema de conexión. Por favor intenta nuevamente.';
      this.img = 'assets/images/partner/firmar.svg';
    }
  }

  home(){
    this.dialogRef.close();
/*     window.location.reload();
 */  }

}
