import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FeatureState, RecipeState } from './../recipe-store/recipe.reducers';

@Component({
	selector: 'app-recipe-list',
	templateUrl: './recipe-list.component.html',
	styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
	recipesState$: Observable<RecipeState>;
	constructor(
		private recipeStore: Store<FeatureState>
	) { }

	ngOnInit() {
		this.recipesState$ = this.recipeStore.select('recipes');
	}
}
