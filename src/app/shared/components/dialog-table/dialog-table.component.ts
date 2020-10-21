import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-table',
  templateUrl: './dialog-table.component.html',
  styleUrls: ['./dialog-table.component.css']
})
export class DialogTableComponent implements OnInit {

  dataSource;
  displayedColumns: string[] = ['airlineName', 'airportDestinationName',
    'airportOriginName', 'cabin', 'originName', 'destinationName'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(public dialogRef: MatDialogRef<DialogTableComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit() {
    console.log(JSON.stringify(this.data));
  }

}
