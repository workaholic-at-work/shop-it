import { Observable, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../shared/ingredient.model';
import { Store } from '@ngrx/store';
import { StartEdit } from './shopping-list-store/shopping-list.actions';
import { AppState } from '../app-store/app.reducers';


@Component({
	selector: 'app-shopping-list',
	templateUrl: './shopping-list.component.html',
	styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
	shoppingListState: Observable<{ ingredients: Ingredient[] }>;
	ingredientsChangedSubscription: Subscription;
	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.shoppingListState = this.store.select('shoppingList');
	}

	editIngredient(index: number) {
		this.store.dispatch(new StartEdit(index));
	}
}
