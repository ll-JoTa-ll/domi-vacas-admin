import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogHotelInfoComponent } from '../dialog-hotel-info/dialog-hotel-info.component';

@Component({
  selector: 'app-dialog-passenger-info',
  templateUrl: './dialog-passenger-info.component.html',
  styleUrls: ['./dialog-passenger-info.component.css']
})
export class DialogPassengerInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogHotelInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any[]) { }

ngOnInit() {
console.log(JSON.stringify(this.data));
}

onClose() {
this.dialogRef.close();
}

}
