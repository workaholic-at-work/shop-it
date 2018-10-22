import { AuthInterceptor } from '../auth/auth.interceptor';
import { AppRouteModule } from './../app-route.module';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';
import { LoggingInterceptor } from '../shared/logging.interceptor';

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
  providers: [RecipeService, AuthService
    , {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}],
})
export class CoreModule {}
