import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import * as config from '../../shared/config';
import { Response } from '../../shared/response.model';
import { Order } from './model/order/order.model';

@Injectable()
export class OrderService {
    constructor(
        private http: HttpClient
    ) { }

    getOrders() {
        return this.http.get<Order[]>(config.getOrdersUrl(config.ORDER_LIST_METHOD));
    }
}
