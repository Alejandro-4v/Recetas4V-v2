import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Recipe } from '@models/recipe';
import { RecipesService } from '@services/recipes-service';

import { Rating } from '@models/rating';
import { RatingsService } from '@services/ratings-service';

import { RecipeView } from '@organisms/recipe-view/recipe-view';
import { RecipesList } from "@organisms/recipes-list/recipes-list";
import { NewRatingForm } from "@organisms/new-rating-form/new-rating-form";
import { NewRecipeForm } from '@organisms/new-recipe-form/new-recipe-form';

declare var bootstrap: any;

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RecipeView, RecipesList, NewRatingForm, NewRecipeForm],
  templateUrl: './main.html',
  styleUrl: './main.scss'
})
export class Main {
  protected readonly title = signal('Recetas4V-v2');

  constructor(private recipesService: RecipesService, private ratingsService: RatingsService) { };

  recipes: Recipe[] = [];

  recipes$!: Observable<Recipe[]>;

  ratings: Rating[] = [];

  private recipesSubscription: Subscription | null = null;

  private ratingsSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.recipes$ = this.recipesService.getRecipes();
    this.recipes$.subscribe(res => this.recipes = res)

    this.recipesSubscription = this.recipesService.changesOnRecipes.subscribe(
      () => {
        this.recipesService.getRecipes().subscribe(res => this.recipes = res);
      }
    )

    this.ratingsSubscription = this.ratingsService.changesOnRecipes.subscribe(
      () => {
        this.ratingsService.getRatings().subscribe(res => this.ratings = res);
      }
    )
  }

  ngOnDestroy(): void {
    this.recipesSubscription?.unsubscribe();
    this.ratingsSubscription?.unsubscribe();
  }

  eliminar(id: number): void {
    this.recipesService.deleteRecipe(id);
  }

  private idAValorar: number = 0;

  private ratingModalInstance: any;

  setIdAValorar(recipeId: number): void {
    this.idAValorar = recipeId;

    const ratingModal = document.getElementById('ratingModal');
    this.ratingModalInstance = new bootstrap.Modal(ratingModal);
    this.ratingModalInstance.show();
  }

  private filterByRatingValue: number = 0;

  setFiltro(rating: number): void {
    console.log(rating)
    this.filterByRatingValue = rating;
  }

  getFiltro(): number {
    console.log("got" + this.filterByRatingValue)
    return this.filterByRatingValue;
  }

  showNewRecipeModal() {
    const newRecipeModal = document.getElementById('newRecipeModal');
    const newRecipeModalInstance = new bootstrap.Modal(newRecipeModal);
    newRecipeModalInstance.show();
  }

  getIdAValorar(): number {
    return this.idAValorar;
  }

  onValorar(rating: Rating): void {
    this.ratingsService.addRating(rating);
    this.ratingModalInstance.hide();
  }

  onCrear(recipe: Recipe): void {
    this.recipesService.addRecipe(recipe);
  }
}
