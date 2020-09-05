import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-charters',
  templateUrl: './charters.component.html',
  styleUrls: ['./charters.component.css']
})
export class ChartersComponent implements OnInit {

  searching: boolean;
  dataSource = [];
  list;
  title;
  displayedColumns: string[] = [ 'transactionDate', 'transactionState', 'paymentType', 'codeTransaction',
                                , 'cabin','passengerName','passengerLastName', 'passengerEmail',
                                 ,'passengerPhone', 'passengerGender',  'passengerType'];

  constructor() { }

  ngOnInit() {
    this.list = sessionStorage.getItem('charterPassenger');
    this.title = this.list.titulo;
    this.dataSource = this.list.listado;
  }

}
