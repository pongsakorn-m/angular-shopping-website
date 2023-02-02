import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cart, CartService, Item } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private cartService: CartService,
              private router: Router,
              private toastr: ToastrService) { }

  cart: Cart = this.cartService.cart;
  selectionList: Item[] = [];

  ngOnInit(): void {

  }

  addQuantity(item: Item) {
    this.cartService.addItem(item);
  }

  downQuantity(item: Item) {
    this.cartService.downQuantity(item);
  }

  removeItem(item: Item) {
    this.selectionList.filter(x => x != item);
    this.cartService.removeItem(item);
    if (!this.cart.totalQty) {
      this.router.navigateByUrl("/");
    } else {
      this.toastr.success(item.name + "deleted successfully");
    }
  }

  viewItem(item: Item) {
    this.router.navigateByUrl("/food/" + item.id);
  }

  get calculatePrice(): number {
    return this.cart.totalQty;
  }

  payment() {

  }

  onSelect(item: Item) {
    this.selectionList.some(x => x == item) ? this.selectionList = this.selectionList.filter(x => x != item) : this.selectionList.push(item);
  }

  isSelected(item: Item): boolean | null {
    return this.selectionList.some(x => x == item) ? true : null;
  }

  get summary() {
    return this.selectionList.reduce((sum, current) => {
      return sum += current.priceAmount;
    }, 0)
  }
}
