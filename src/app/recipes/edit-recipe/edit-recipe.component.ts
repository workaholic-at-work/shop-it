import { AddRecipe } from './../recipe-store/recipe.actions';
import { Store } from '@ngrx/store';
import { FeatureState, RecipeState } from './../recipe-store/recipe.reducers';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { UpdateRecipe } from '../recipe-store/recipe.actions';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-edit-recipe',
	templateUrl: './edit-recipe.component.html',
	styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
	editMode = false;
	id: number;
	constructor(private route: ActivatedRoute,
		private store: Store<FeatureState>,
		private router: Router) { }

	recipeForm: FormGroup;

	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = +params['id'];
					this.editMode = params['id'] != null;
					this.initForm();
				}
			);
	}

	initForm() {
		let recipeName = '';
		let recipeDescription = '';
		let recipeImagePath = '';
		const recipeIngredients = new FormArray([]);
		if (this.editMode) {
			this.store.select('recipes').
				pipe(
					take(1)
				)
				.subscribe(
					(recipeState: RecipeState) => {
						const recipe = recipeState.recipes[this.id];
						recipeName = recipe.name;
						recipeDescription = recipe.description;
						recipeImagePath = recipe.imagePath;
						if (recipe['ingredients']) {
							recipe.ingredients.forEach(ingredient => {
								recipeIngredients.push(new FormGroup({
									'name': new FormControl(ingredient.name, Validators.required),
									'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')])
								}));
							});
						}
					}
				);
		}
		this.recipeForm = new FormGroup({
			'recipeInfo': new FormGroup({
				'name': new FormControl(recipeName),
				'imagePath': new FormControl(recipeImagePath),
				'description': new FormControl(recipeDescription)
			}),
			'ingredients': recipeIngredients
		});
	}

	onAddIngredient() {
		(<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
			'name': new FormControl(null, Validators.required),
			'amount': new FormControl(null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]),
		}));
	}

	onSubmit() {
		const formValue = this.recipeForm.value;
		const recipe = new Recipe(formValue.recipeInfo.name, formValue.recipeInfo.description,
			formValue.recipeInfo.imagePath, formValue.ingredients);
		if (this.editMode) {
			this.store.dispatch(new UpdateRecipe({index: this.id, updatedRecipe: recipe}));
		} else {
			this.store.dispatch(new AddRecipe(recipe));
		}
		this.recipeForm.reset();
		this.onCancel();
	}

	onCancel() {
		this.recipeForm.reset();
		this.router.navigate(['../'], { relativeTo: this.route });
	}

	deleteIngredient(index: number) {
		(<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
	}

	getControls() {
		return (<FormArray>this.recipeForm.get('ingredients')).controls;
	}
}
