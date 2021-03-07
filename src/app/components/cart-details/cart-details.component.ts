import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;
  subscriptions = new Subscription();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.loadCartDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  incrementQuantity(cartItem: CartItem) {
    this.cartService.addToCart(cartItem);
  }

  private loadCartDetails() {
    this.cartItems = this.cartService.cartItems;
    this.subscriptions.add(this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    ));
    this.subscriptions.add(this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    ));

    this.cartService.computeCartTotals();
  }
}
