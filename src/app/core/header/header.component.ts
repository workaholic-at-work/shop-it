import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from './../../auth/auth-store/auth.reducers';
import { FetchRecipes, StoreRecipes } from './../../recipes/recipe-store/recipe.actions';
import { LogoutAction } from '../../auth/auth-store/auth.actions';
import { FeatureState } from '../../recipes/recipe-store/recipe.reducers';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	authState: Observable<AuthState>;
	constructor(
		private store: Store<FeatureState>) { }

	ngOnInit() {
		this.authState = this.store.select('auth');
	}

	saveData() {
		this.store.dispatch(new StoreRecipes());
	}

	fetchData() {
		this.store.dispatch(new FetchRecipes());
	}

	logout() {
		this.store.dispatch(new LogoutAction());
	}
}
