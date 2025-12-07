import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '@models/recipe';
import { RatingsService } from '@services/ratings-service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  
  constructor(private http: HttpClient, private ratingsService: RatingsService) {}

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>('https://69302440778bbf9e007001bb.mockapi.io/recipe').pipe(
      switchMap(recipes => {
        
        const recipesWithRatings$ = recipes.map(recipe =>
          this.ratingsService.getRatingsFromRecipeId(Number(recipe.id)).pipe(
            map(ratings => ({
              ...recipe,
              ratings,
              averageRating: ratings.length
                ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
                : 0
            }))
          )
        );
        return forkJoin(recipesWithRatings$);
      })
    );
  }

}
