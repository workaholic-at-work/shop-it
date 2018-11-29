import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { RecipesComponent } from './recipes.component';
import { SelectRecipeComponent } from './select-recipe/select-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipesRoutes: Routes = [
	{
		path: '', component: RecipesComponent, children: [
			{ path: '', component: SelectRecipeComponent, pathMatch: 'full' },
			{ path: 'new', component: EditRecipeComponent },
			{ path: ':id', component: RecipeDetailComponent },
			{ path: ':id/edit', component: EditRecipeComponent }
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(recipesRoutes)
	],
	exports: [RouterModule]
})
export class RecipesRoutingModule {

}
