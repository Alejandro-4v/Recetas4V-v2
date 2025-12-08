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

declare var bootstrap: any;

@Component({
  selector: 'app-main',
  imports: [RouterOutlet, RecipeView, RecipesList, NewRatingForm],
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

  private modalInstance: any;

  setIdAValorar(recipeId: number): void {
    this.idAValorar = recipeId;

    const modal = document.getElementById('ratingModal');
    this.modalInstance = new bootstrap.Modal(modal);
    this.modalInstance.show();
  }

  getIdAValorar(): number {
    return this.idAValorar;
  }

  onValorar(rating: Rating): void {
    this.ratingsService.addRating(rating);
    this.modalInstance.hide();
  }
}
