import { AuthGuard } from './auth/auth-guard.service';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { SelectRecipeComponent } from './recipes/select-recipe/select-recipe.component';
import { EditRecipeComponent } from './recipes/edit-recipe/edit-recipe.component';
import { SignupComponent } from './auth/signup/signup.component';

const appRoutes: Routes = [
    {
        path: 'recipes', component: RecipesComponent, children: [
            { path: '', component: SelectRecipeComponent, pathMatch: 'full' },
            { path: 'new', component: EditRecipeComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: EditRecipeComponent }
        ], canActivate: [AuthGuard]
    },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'shoppinglist', component: ShoppingListComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    { path: '**', redirectTo: '/recipes' }
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouteModule {

}
