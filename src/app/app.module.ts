import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from './auth/auth-store/auth.effects';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './app.component';
import { reducers } from './app-store/app.reducers';
import { environment } from './../environments/environment';
@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		AuthModule,
		CoreModule,
		ShoppingListModule,
		StoreModule.forRoot(reducers),
		EffectsModule.forRoot([AuthEffects]),
		StoreRouterConnectingModule,
		!environment.production ? StoreDevtoolsModule.instrument() : []
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
