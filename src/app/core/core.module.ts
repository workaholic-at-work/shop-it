import { AppRouteModule } from './../app-route.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        SharedModule,
        AppRouteModule
    ],
    exports: [
        HomeComponent,
        HeaderComponent,
        AppRouteModule,
        BrowserModule,
        HttpClientModule,
        SharedModule
    ],
  providers: [ShoppingListService, RecipeService, AuthService],
})
export class CoreModule {}
