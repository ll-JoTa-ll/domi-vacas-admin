import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/packages/shared/package.service';
import { OrderService } from 'src/app/packages/shared/order.service';
import { Order } from 'src/app/packages/shared/model/order/order.model';
import { Cip } from 'src/app/packages/shared/model/order/cip.model';
import { Visa } from 'src/app/packages/shared/model/order/visa.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  providers: [ OrderService ]
})
export class OrderListComponent implements OnInit {

  displayedColumns: string[] = [
    'status',
    'description',
    'date',
    'packageName',
    'contactName',
    'contactPhone',
    'contactMail',
    'total',
    'payementType',
    'cip',
    'expirationDateCip',
    'orderVisa',
    'errorCodeVisa',
    'errorDescriptionVisa',
    'sector',
    'transactionDate'
  ];
  dataSource = [];
  searching: boolean;

  constructor(
    private orderService: OrderService,
  ) { }


  ngOnInit() {
    this.getOrders();
    setInterval(() => {
      this.getOrders();
    }, 300000);
  }

  getOrders() {
    this.searching = true;
    this.orderService.getOrders().subscribe(
      x => {
          this.dataSource = x;
      },
      err => {
        console.log('error: ' + err);
        this.searching = false;
      },
      () => {
        this.searching = false;
      }
    );
  }

  refresh() {
    this.getOrders();
  }
}
