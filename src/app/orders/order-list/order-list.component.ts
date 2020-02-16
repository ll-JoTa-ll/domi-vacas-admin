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
    // setTimeout(() => {
    //   this.getOrders();
    // }, 500);
    this.getOrders();
  }

  getOrders() {
    this.searching = true;
    this.orderService.getOrders().subscribe(
      x => {
        // if (x.confirmation) {
          this.dataSource = x;
          console.log(this.dataSource);
          // this.dataSource = this.getDemo();
        // }
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
  // getDemo(): Order[] {
  //   const orders = [];
  //   const order = new Order();
  //   order.id = '1';
  //   order.paymentType = 'VISA';
  //   order.oCip = new Cip();
  //   order.oCip.description = 'hola cip';
  //   order.oCip.status = 'cancelado';
  //   order.oVisa = new Visa();
  //   order.oVisa.status = 'expirado';
  //   order.oVisa.description = 'hola visa';
  //   orders.push(order);
  //   return orders;
  // }

}
