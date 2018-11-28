import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';

import * as recipeActions from '../recipe-store/recipe.actions';
import { switchMap, map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
export class RecipeEffects {
	@Effect()
	getRecipes = this.actions$
		.ofType(recipeActions.FETCH_RECIPES)
		.pipe(
			switchMap(
				() => {
					return this.httpClient.get<Recipe[]>('https://shop-it-63921.firebaseio.com/recipes.json', {
						responseType: 'json',
						observe: 'body'
					});
				}),
				map((recipes) => {
					for (const recipe of recipes) {
						if (!recipe['ingredients']) {
							recipe['ingredients'] = [];
						}
					}
					return {
						type: recipeActions.SET_RECIPES,
						payload: recipes
					};
				})
		);


	constructor(private actions$: Actions, private httpClient: HttpClient) { }
}
