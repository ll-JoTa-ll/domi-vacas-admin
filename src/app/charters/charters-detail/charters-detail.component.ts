import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ViewChildren } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';
import { ExcelService } from '../shared/excelService.model';


@Component({
  selector: 'app-charters-detail',
  templateUrl: './charters-detail.component.html',
  styleUrls: ['./charters-detail.component.css'],
  providers: [ExcelService]
})
export class ChartersDetailComponent implements OnInit  {

  searching: boolean;
  dataSource = [];
  list;
  showRow = false;
  title;
  displayedColumns: string[] = [ 'transactionDate', 'transactionState', 'paymentType', 'codeTransaction',
                                'cabin','passengerName','passengerLastName', 'passengerEmail',
                                 'passengerPhone', 'passengerGender',  'passengerType'];

  constructor(private sessionService: SessionService,private excelService: ExcelService) { }

  ngOnInit() {
    this.list = this.sessionService.getCharterDetail();
    this.title = this.list.titulo;
    this.dataSource = this.list.listado;
  }

  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.list.listado, this.title);
 }




}
