import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Package } from '../shared/package.model';

@Component({
  selector: 'app-dialog-clone-package',
  templateUrl: './dialog-clone-package.component.html',
  styleUrls: ['./dialog-clone-package.component.css']
})
export class DialogClonePackageComponent implements OnInit {

  name: '';

  constructor(
    public dialogRef: MatDialogRef<DialogClonePackageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Package,
  ) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
