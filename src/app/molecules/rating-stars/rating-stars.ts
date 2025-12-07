import { Component, input, computed } from '@angular/core';
import { Star } from '@atoms/star/star';

@Component({
  selector: 'app-rating-stars',
  imports: [Star],
  templateUrl: './rating-stars.html',
  styleUrl: './rating-stars.scss',
})
export class RatingStars {

  rating = input<number>(0);
  reviews = input<number>(0);

  fullStars = computed(() => Math.round(this.rating()));
  ratingDecimals = computed(() => this.rating() - this.fullStars());

  halfStars = computed(() => Math.round(this.ratingDecimals()));

  emptyStars = computed(() => 5 - this.halfStars() - this.fullStars() );

}
