import { Component, output } from '@angular/core';
import { LabeledField } from '@molecules/labeled-field/labeled-field';
import { Recipe } from '@models/recipe';

@Component({
  selector: 'app-new-recipe-form',
  imports: [LabeledField],
  templateUrl: './new-recipe-form.html',
  styleUrl: './new-recipe-form.scss',
})
export class NewRecipeForm {

  enviar = output<Recipe>();

  onEnviar(): void {

    const nameInput = document.getElementById('recipeName-i') as HTMLInputElement;
    const ingredientsInput = document.getElementById('ingredients-i') as HTMLInputElement;
    const prepTimeMinutesInput = document.getElementById('prepTimeMinutes-i') as HTMLInputElement;

    if (!nameInput.value || !ingredientsInput.value || !prepTimeMinutesInput.value) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (isNaN(Number(prepTimeMinutesInput.value))) {
      alert("El tiempo de preparación debe ser un número");
      return;
    }

    const ingredients: Array<string> = ingredientsInput.value.split(',');

    const ingredientsToInsert: Array<string> = [];

    for (let i = 0; i < ingredients.length; i++) {
      let ingredient = ingredients[i];
      ingredient = ingredient.trim();
      if (ingredient != "") {
        ingredientsToInsert.push(ingredient);
      }
    }

    if (ingredientsToInsert.length == 0) {
      alert("Debe introducir al menos un ingrediente válido");
      return;
    }

    const newRecipe: Recipe = {
      id: 0,
      recipeName: nameInput.value,
      ingredients: ingredientsToInsert,
      prepTimeMinutes: Number(prepTimeMinutesInput.value),
      ratings: [],
      averageRating: 0
    };

    this.enviar.emit(newRecipe);

  }

}
