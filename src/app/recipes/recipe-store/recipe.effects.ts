import { FeatureState } from './recipe.reducers';
import { Store } from '@ngrx/store';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';

import * as recipeActions from '../recipe-store/recipe.actions';
import { switchMap, map, take, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { Injectable } from '@angular/core';

@Injectable()
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


	@Effect({dispatch: false})
	storeRercipes = this.actions$
			.ofType(recipeActions.STORE_RECIPES)
			.pipe(
				withLatestFrom(this.recipeStore.select('recipes')),
				switchMap(
					([action, recipeState]) => {
						// tslint:disable-next-line:max-line-length
						const req = new HttpRequest('PUT', 'https://shop-it-63921.firebaseio.com/recipes.json', recipeState.recipes, {reportProgress: true});
						return this.httpClient.request(req);
					}
				)
			);
	constructor(
		private actions$: Actions,
		private httpClient: HttpClient,
		private recipeStore: Store<FeatureState>) { }
}
