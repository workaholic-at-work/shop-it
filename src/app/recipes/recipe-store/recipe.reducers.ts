import { AppState } from './../../app-store/app.reducers';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import * as RecipeActions from './recipe.actions';

export interface FeatureState extends AppState {
	recipes: RecipeState;
}

export interface RecipeState {
	recipes: Recipe[];
}

const initialState: RecipeState = {
	recipes: [
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
	]
};

export function recipeReducers(state = initialState, action: RecipeActions.RecipeActions) {
	switch (action.type) {
		case RecipeActions.SET_RECIPES:
			return {
				...state,
				recipes: [...action.payload]
			};
		case RecipeActions.ADD_RECIPE:
			return {
				...state,
				recipes: [...state.recipes, action.payload]
			};
		case RecipeActions.UPDATE_RECIPE:
			const updateRecipe = state.recipes[action.payload.index];
			const updatedRecipe = {
				...updateRecipe,
				...action.payload.updatedRecipe
			};
			const recipes = state.recipes;
			recipes[action.payload.index] = updatedRecipe;
			return {
				...state,
				recpies: recipes
			};
		case RecipeActions.DELETE_RECIPE:
			const oldRecipes = [...state.recipes];
			oldRecipes.splice(action.payload, 1);
			return {
				...state,
				recipes: oldRecipes
			};
		default:
			return state;
	}
}
