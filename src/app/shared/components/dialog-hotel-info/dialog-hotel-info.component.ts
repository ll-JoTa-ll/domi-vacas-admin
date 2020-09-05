import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-hotel-info',
  templateUrl: './dialog-hotel-info.component.html',
  styleUrls: ['./dialog-hotel-info.component.css']
})
export class DialogHotelInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogHotelInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

ngOnInit() {
console.log(JSON.stringify(this.data));
}

onClose() {
this.dialogRef.close();
}

}
