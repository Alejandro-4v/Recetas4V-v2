import { Rating } from "./rating";

export interface Recipe {
    id: number;
    recipeName: string;
    ingredients: string[];
    prepTimeMinutes: number;
    ratings: Rating[];
    averageRating: number;
}