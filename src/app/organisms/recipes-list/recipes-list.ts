import { Component, input, output, effect } from '@angular/core';
import { Recipe } from '@models/recipe';
import { RecipesService } from '@services/recipes-service';
import { Subscription, switchMap } from 'rxjs';

import { RecipeView } from '@organisms/recipe-view/recipe-view';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeView],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList {

  recipes: Recipe[] = [];

  filterBy = input<number>(0);

  private recipesSubscription: Subscription | null = null;

  constructor(private recipesService: RecipesService) {
    effect((onCleanup) => {
      const subscription = this.recipesService.getRecipesByRating(this.filterBy()).subscribe(res => {
        this.recipes = res;
      });

      onCleanup(() => subscription.unsubscribe());
    });
  }

  ngOnInit(): void {
    this.recipesSubscription = this.recipesService.changesOnRecipes.pipe(
      switchMap(() => this.recipesService.getRecipesByRating(this.filterBy()))
    ).subscribe(
      (res) => {
        this.recipes = res;
      }
    );
  }

  ngOnDestroy(): void {
    this.recipesSubscription?.unsubscribe();
  }

  eliminar(recipe: Recipe): void {
    this.recipesService.deleteRecipe(recipe.id);
  }

  valorar = output<number>();

  onValorar(recipe: Recipe): void {
    this.valorar.emit(recipe.id);
  }

}