import { Component, OnInit } from '@angular/core';
import { OrderData } from 'src/app/common/order-data';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  readonly dateFormat: string = environment.dateFormat;
  orders: OrderData[] = [];
  authUserEmail: string = '';
  pageNumber: number = 1;
  pageSize: number = 5;
  totalElements: number = 0;
  authEmail: string= '';

  constructor(private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authData.subscribe(
      authData => {
        this.authEmail = authData.email;
        this.listOrders();
      }
    );
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listOrders();
  }

  listOrders() {
    this.orderService.getOrderListPaginate(this.authEmail, this.pageNumber - 1, this.pageSize).subscribe(
      ordersData => {
        this.orders = ordersData._embedded.orders;
        this.pageNumber = ordersData.page.number + 1;
        this.pageSize = ordersData.page.size;
        this.totalElements = ordersData.page.totalElements;
      }
    );
  }

}
