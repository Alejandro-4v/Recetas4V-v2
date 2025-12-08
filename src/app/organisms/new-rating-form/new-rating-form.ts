import { Component, input, output } from '@angular/core';
import { Rating } from '@models/rating';
import { Recipe } from '@models/recipe';
import { LabeledField } from "@molecules/labeled-field/labeled-field";

@Component({
  selector: 'app-new-rating-form',
  imports: [LabeledField],
  templateUrl: './new-rating-form.html',
  styleUrl: './new-rating-form.scss',
})
export class NewRatingForm {

  recipeId = input.required<number>();

  enviar = output<Rating>();

  onEnviar(): void {
    const ratingInput = document.getElementById('rating-i') as HTMLInputElement;
    const raterInput = document.getElementById('raterName-i') as HTMLInputElement;

    const ratingValue = Number(ratingInput.value);
    const raterName = raterInput.value;

    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      alert("La puntuación debe estar entre 0 y 5");
      return;
    }

    const newRating: Rating = {
      id: 0,
      recipeId: this.recipeId(),
      raterName: raterName,
      rating: ratingValue
    };

    this.enviar.emit(newRating);
  }

}
