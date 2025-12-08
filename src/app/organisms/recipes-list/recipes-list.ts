import { Component, output } from '@angular/core';
import { Recipe } from '@models/recipe';
import { RecipesService } from '@services/recipes-service';
import { Observable, Subscription } from 'rxjs';

import { RecipeView } from '@organisms/recipe-view/recipe-view';

@Component({
  selector: 'app-recipes-list',
  imports: [RecipeView],
  templateUrl: './recipes-list.html',
  styleUrl: './recipes-list.scss',
})
export class RecipesList {

  recipes: Recipe[] = [];
  
  recipes$!: Observable<Recipe[]>;

  private recipesSubscription: Subscription | null = null;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipes$ = this.recipesService.getRecipes();
    this.recipes$.subscribe(res => this.recipes = res);

    this.recipesSubscription = this.recipesService.changesOnRecipes.subscribe(
      () => {
        this.recipesService.getRecipes().subscribe(res => this.recipes = res);
      }
    )
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
