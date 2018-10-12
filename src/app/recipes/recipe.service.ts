import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipeUpdates = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        new Recipe('Big Burger', 'All delecious!!',
            'https://amp.businessinsider.com/images/5a7dc169d03072af008b4bf2-750-562.jpg',
            [
                new Ingredient('Buns', 3),
                new Ingredient('Potato', 10)
            ]),
        new Recipe('Margarita', 'Cheesy as hell!!',
            // tslint:disable-next-line:max-line-length
            'https://media.istockphoto.com/photos/slice-of-hot-pizza-picture-id519526540?k=6&m=519526540&s=612x612&w=0&h=ouy892vP2sk0z0lMouKBqo8YXtSgq9PdnAg-cvUd_YQ=',
            [
                new Ingredient('Cheese', 10),
                new Ingredient('Tomato', 5)
            ])
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes(): Recipe[] {
        return this.recipes.slice();
    }

    getRecipe(id: number): Recipe {
        return this.recipes[id];
    }

    addIngreientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addMultipleIngredients(ingredients);
    }

    addNewRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeUpdates.next(this.recipes.slice());
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipeUpdates.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipeUpdates.next(this.recipes.slice());
    }
}
