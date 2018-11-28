import { ActionReducerMap } from '@ngrx/store';

import { AuthState, authReducer } from '../auth/auth-store/auth.reducers';
import { ShoppingListState, shoppingListReducer } from '../shopping-list/shopping-list-store/shopping-list.reducers';

export interface AppState {
	shoppingList: ShoppingListState;
	auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
	shoppingList: shoppingListReducer,
	auth: authReducer
};
