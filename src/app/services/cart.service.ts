import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart = false;
    let existingCartItem = undefined;

    if(this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(item => item.id === cartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if(alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    this.cartItems.forEach(item => {
      totalPriceValue += item.unitPrice * item.quantity;
      totalQuantityValue += item.quantity;
    });

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // this.totalQuantity.next(this.cartItems.reduce((acc, cur) => acc + cur.quantity, 0));
    // this.totalPrice.next(this.cartItems.reduce((acc, cur) => acc + cur.unitPrice*cur.quantity, 0));
  }
}
