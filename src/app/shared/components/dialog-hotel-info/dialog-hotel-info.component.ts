import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-hotel-info',
  templateUrl: './dialog-hotel-info.component.html',
  styleUrls: ['./dialog-hotel-info.component.css']
})
export class DialogHotelInfoComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['name', 'lastName',
    'documentType', 'documentNumber', 'email', 'birthDate', 'telephoneNumber'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<DialogHotelInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

ngOnInit() {

}

onClose() {
this.dialogRef.close();
}

}
