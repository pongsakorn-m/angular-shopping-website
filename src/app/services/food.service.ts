import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods } from 'src/data';
import { BASE_URL } from '../shared/cosnstants/url';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Food[]> {
    return this.httpClient.get<Food[]>(BASE_URL + "/foods");
  }

  getByKeyword(keyword: string): Observable<Food[]> {
    return this.httpClient.get<Food[]>(BASE_URL + "/foods/search", { params: { keyword: keyword } });
  }

  getFoodByFoodId(foodId: string):  Observable<Food> {
    return this.httpClient.get<Food>(BASE_URL + "/foods/getFoodByFoodId" + foodId);
  }
}
