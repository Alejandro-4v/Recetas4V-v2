import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '@models/recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  constructor(private http: HttpClient) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://69302440778bbf9e007001bb.mockapi.io/recipe').pipe(
      map(data => data.map(item => ({
        id: Number(item.id),
        recipeName: item.recipeName,
        ingredients: item.ingredients || [],
        prepTimeMinutes: item.prepTimeMinutes || 0,
        ratings: item.ratings || [],
        averageRating: item.averageRating || 0
      })))
    );
  }

}
