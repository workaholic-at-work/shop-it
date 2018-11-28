import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthState } from './../../auth/auth-store/auth.reducers';
import { FetchRecipes } from './../../recipes/recipe-store/recipe.actions';
import { DataStorageService } from '../../shared/data-storage.service';
import { LogoutAction } from '../../auth/auth-store/auth.actions';
import { RecipeState } from 'src/app/recipes/recipe-store/recipe.reducers';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	authState: Observable<AuthState>;
	constructor(private dataStorageService: DataStorageService,
		private store: Store<RecipeState>) { }

	ngOnInit() {
		this.authState = this.store.select('auth');
	}

	saveData() {
		this.dataStorageService.storeRecipes()
			.subscribe(
				x => console.log(x)
			);
	}

	fetchData() {
		this.store.dispatch(new FetchRecipes());
	}

	logout() {
		this.store.dispatch(new LogoutAction());
	}
}
