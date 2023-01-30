import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { FoodService } from 'src/app/services/food.service';
import { Food } from 'src/app/shared/models/Food';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

  constructor(private actRoute: ActivatedRoute,
              private foodService: FoodService,
              private cartService: CartService,
              private toastr: ToastrService) {
    const foodId = this.actRoute.snapshot.paramMap.get('foodId');
    if (foodId) {
      this.foodService.getFoodByFoodId(foodId).subscribe(res => {
        this.food =  res;
      })
    }
  }

  food?: Food;

  ngOnInit(): void {

  }

  addToCart() {
    this.cartService.addItem(this.food ?? new Food());
    this.toastr.success(this.food?.name + " add to cart successfully");
  }
}
