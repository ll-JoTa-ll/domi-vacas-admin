import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-notification',
  templateUrl: './dialog-notification.component.html',
  styleUrls: ['./dialog-notification.component.css']
})
export class DialogNotificationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNotificationComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
    ) { }

  ngOnInit() {
  }

  onClose() {
    this.dialogRef.close();
  }

}
