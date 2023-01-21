import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';
import { AddCartComponent } from '../add-cart/add-cart.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private foodService: FoodService,
              private cartService: CartService,
              private modal: NgbModal) {

    let keyword = localStorage.getItem("keyword");
    if (keyword || keyword != '') {
      this.keyword = keyword
      this.foods = this.foodService.getByKeyword(keyword??'');
    } else {
      this.foods = this.foodService.getAll();
    }
  }

  foods:Food[] = [];
  keyword: string | null = null;

  ngOnInit(): void {

  }

  search() {
    console.log(this.keyword)
    if (this.keyword) {
      console.log(this.keyword)
      localStorage.setItem("keyword", this.keyword);
      this.foods = this.foodService.getByKeyword(this.keyword);
    } else {
      localStorage.removeItem("keyword");
      this.foods = this.foodService.getAll();
    }
  }

  addToCart(food: Food) {
    //this.cartService.addItem(food);
    //console.log(this.cartService.cart)

    let modalRef = this.modal.open(AddCartComponent, {  });

    modalRef.componentInstance.initialData = food;

    modalRef.result.then((result => {
      //console.log(result)
    }));
  }
}
