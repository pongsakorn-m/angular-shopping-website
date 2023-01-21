import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, of } from 'rxjs';
import { Food } from '../shared/models/Food';

export class Cart {
  items: Item[] = [];
  totalQty: number = 0;
  totalAmount: number = 0;
}

export class Item extends Food {
  qty: number = 0;
  priceAmount: number = 0;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    localStorage.getItem('cart') ? this.cart = JSON.parse(localStorage.getItem('cart') ?? "") : new Cart();
  }

  public cart: Cart = new Cart();
  private quantity = new BehaviorSubject<number>(this.cart.totalQty);


  public addItem(food: Food, quantity:number = 0) {
    this.cart.items?.find(item => item.id == food.id) ? this.addQuantity(this.cart.items?.find(item => item.id == food.id) ?? new Item(), quantity) : this.addNewItem(food, quantity);
  }

  private addNewItem(food: Food, quantity:number = 0) {
    let item = food as Item
    quantity ? item.qty = quantity : item.qty = 1;
    item.priceAmount = food.price * item.qty;
    this.cart.items?.push(item);
    this.calculate();

  }

  private addQuantity(item: Item, quantity:number = 0) {
    console.log(quantity)
    if (quantity) {
      item.qty += quantity;
    } else {
      item.qty++;
    }
    item.priceAmount = item.qty * item.price;
    this.calculate();
  }

  public downQuantity(item: Item) {
    item.qty--;
    item.qty == 0 ? this.removeItem(item) : item.priceAmount = item.qty * item.price;
    this.calculate();
  }

  public removeItem(removeItem: Item) {
    this.cart.items = this.cart.items?.filter(item => item != removeItem);
    this.calculate();
  }

  private calculate() {
    this.cart.totalQty = this.cart.items?.reduce((sum, current) => sum + current.qty, 0) ?? 0
    this.cart.totalAmount = this.cart.items?.reduce((sum, current) => sum + current.price, 0) ?? 0
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.quantity.next(this.cart.totalQty);
  }

  public getQuantity()  {
    return this.quantity.asObservable().pipe((u) => {
      if (!!u) {
        this.quantity.next(this.cart.totalQty)
        return u
      }
      return of(this.cart.totalQty)
    });
  }
}
