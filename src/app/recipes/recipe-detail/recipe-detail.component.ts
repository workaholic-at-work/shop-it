import { DeleteRecipe } from './../recipe-store/recipe.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../../shopping-list/shopping-list-store/shopping-list.actions';
import { FeatureState, RecipeState } from '../recipe-store/recipe.reducers';
import { Recipe } from '../recipe.model';
@Component({
	selector: 'app-recipe-detail',
	templateUrl: './recipe-detail.component.html',
	styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
	recipes: Recipe[];
	recipe: Recipe;
	id: number;
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private appStore: Store<FeatureState>) { }

	ngOnInit() {
		this.appStore.select('recipes')
				.subscribe(
					(recipe: RecipeState) => this.recipes = recipe.recipes
				);
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = +params['id'];
					this.recipe = this.recipes[this.id];
				}
			);
	}

	addToShoppingList() {
		this.appStore.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
	}

	deleteRecipe() {
		this.appStore.dispatch(new DeleteRecipe(this.id));
		this.router.navigate(['recipes']);
	}
}
