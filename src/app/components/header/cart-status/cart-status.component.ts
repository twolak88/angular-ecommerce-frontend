import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit, OnDestroy {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  subscriptions: Subscription = new Subscription();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  updateCartStatus() {
    this.subscriptions.add(this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    ));
    this.subscriptions.add(this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    ));
  }
}
