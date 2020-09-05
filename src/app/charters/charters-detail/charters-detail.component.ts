import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/shared/services/session.service';

@Component({
  selector: 'app-charters-detail',
  templateUrl: './charters-detail.component.html',
  styleUrls: ['./charters-detail.component.css']
})
export class ChartersDetailComponent implements OnInit {

  searching: boolean;
  dataSource = [];
  list;
  title;
  displayedColumns: string[] = [ 'transactionDate', 'transactionState', 'paymentType', 'codeTransaction',
                                'cabin','passengerName','passengerLastName', 'passengerEmail',
                                 'passengerPhone', 'passengerGender',  'passengerType'];

  constructor(private sessionService: SessionService) { }

  ngOnInit() {
    this.list = this.sessionService.getCharterDetail();
    this.title = this.list.titulo;
    this.dataSource = this.list.listado;
  }

}
