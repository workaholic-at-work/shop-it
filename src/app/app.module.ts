import { AuthModule } from './auth/auth.module';
import { RecipesModule } from './recipes/recipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRouteModule } from './app-route.module';
import { MinlengthValidatorDirective } from './shared/minlength-validator.directive';
import { RecipeService } from './recipes/recipe.service';
import { AuthService } from './auth/auth.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MinlengthValidatorDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RecipesModule,
    ShoppingListModule,
    AuthModule,
    AppRouteModule,
    SharedModule
  ],
  providers: [ShoppingListService, RecipeService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
