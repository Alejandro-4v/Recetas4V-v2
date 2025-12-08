import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, Subject, forkJoin, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '@models/recipe';
import { RatingsService } from '@services/ratings-service';

@Injectable({ providedIn: 'root' })
export class RecipesService {

  updateSubject = new ReplaySubject<void>();
  changesOnRecipes = this.updateSubject.asObservable();

  constructor(private http: HttpClient, private ratingsService: RatingsService) { }

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

  getRecipesByRating(rating: number): Observable<Recipe[]> {
    return this.getRecipes().pipe(
      map(recipes => recipes.filter(recipe => recipe.averageRating >= rating))
    );

  }


  deleteRecipe(id: number): void {
    this.http.delete<void>(`https://69302440778bbf9e007001bb.mockapi.io/recipe/${id}`)
      .subscribe(() => {
        this.updateSubject.next();
      });
  }

  addRecipe(recipe: Recipe): void {
    const { id, ratings, averageRating, ...recipeWithoutRatings } = recipe;
    this.http.post<any>('https://69302440778bbf9e007001bb.mockapi.io/recipe', recipeWithoutRatings)
      .subscribe(() => {
        this.updateSubject.next();
      });
  }

}
