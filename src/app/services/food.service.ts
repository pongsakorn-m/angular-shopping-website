import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() {
  }

  getAll(): Food[] {
    return sample_foods;
  }

  getByKeyword(keyword: string): Food[] {
    return this.getAll().filter(food => food.name.toLowerCase().includes(keyword.toLowerCase()));
  }

  getFoodByFoodId(foodId: string): Food | undefined {
    return sample_foods.find(food => food.id == foodId);
  }
}
