import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHotelInfoComponent } from '../dialog-hotel-info/dialog-hotel-info.component';

@Component({
  selector: 'app-dialog-info-pass',
  templateUrl: './dialog-info-pass.component.html',
  styleUrls: ['./dialog-info-pass.component.css']
})
export class DialogInfoPassComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogHotelInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any[]) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
    }

}
