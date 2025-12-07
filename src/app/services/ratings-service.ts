import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Rating } from '@models/rating';

@Injectable({
  providedIn: 'root',
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  getRatings(): Observable<Rating[]> {
    return this.http.get<Rating[]>(
      'https://69302440778bbf9e007001bb.mockapi.io/rating'
    );
  }

  getRatingsFromRecipeId(recipeId: number): Observable<Rating[]> {
    return this.http.get<Rating[]>(
      `https://69302440778bbf9e007001bb.mockapi.io/rating?recipeId=${recipeId}`
    );
  }

}
