import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  readonly CART_ITEMS_STORAGE_ITEM_NAME = 'cartItems';
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;
  // storage: Storage = localStorage;

  constructor() {
    let data = JSON.parse(this.storage.getItem(this.CART_ITEMS_STORAGE_ITEM_NAME));

    if (data != null) {
      this.cartItems = data;

      this.computeCartTotals();
    }
  }

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

    this.persistCartItems();

    console.log(`${totalPriceValue}, ${totalQuantityValue}`)
  }

  reset() {
    this.cartItems = [];
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
  }

  private persistCartItems() {
    this.storage.setItem(this.CART_ITEMS_STORAGE_ITEM_NAME, JSON.stringify(this.cartItems));
  }
}
