import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { ReplaySubject } from 'rxjs';

import { Rating } from '@models/rating';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {

  updateSubject = new ReplaySubject<void>();
  changesOnRecipes = this.updateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(
      'https://69302440778bbf9e007001bb.mockapi.io/rating'
    );
  }

  getRatingsFromRecipeId(recipeId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(
      `https://69302440778bbf9e007001bb.mockapi.io/rating?recipeId=${recipeId}`)
      .pipe(
        catchError(error => {
          return of([]);
        })
      );
  }

  addRating(rating: Rating): void {
    const { id, ...ratingWithoutId } = rating;

    this.http.post<any>('https://69302440778bbf9e007001bb.mockapi.io/rating', ratingWithoutId)
      .subscribe(() => {
        this.updateSubject.next();
      });
  }

  deleteRatingByRecipeId(recipeId: number): void {
    this.http.delete<void>(`https://69302440778bbf9e007001bb.mockapi.io/rating?recipeId=${recipeId}`).subscribe(() => {
      this.updateSubject.next();
    });
  }
}
