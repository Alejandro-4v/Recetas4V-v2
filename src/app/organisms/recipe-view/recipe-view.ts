import { Component, input, output } from '@angular/core';
import { Recipe } from '@models/recipe';
import { RatingStars } from '@molecules/rating-stars/rating-stars';

@Component({
  selector: 'app-recipe-view',
  imports: [RatingStars],
  templateUrl: './recipe-view.html',
  styleUrl: './recipe-view.scss',
})
export class RecipeView {

  recipe = input.required<Recipe>();

  eliminar = output<number>();

  onEliminar() {
    this.eliminar.emit(this.recipe().id);
  }
  
}
