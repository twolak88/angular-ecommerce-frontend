import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

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

    console.log(this.cartItems);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;
    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(cartItem) {
    const index: number = this.cartItems.findIndex(item => item.id === cartItem.id);
    if (index > -1){
      this.cartItems.splice(index, 1);
      this.computeCartTotals();
    }
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

    console.log(`${totalPriceValue}, ${totalQuantityValue}`)
  }
}
