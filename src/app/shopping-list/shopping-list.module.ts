import { ShoppingListRoutingModule } from './shopping-list-route.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ShoppingListComponent,
		ShoppingEditComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ShoppingListRoutingModule
	]
})
export class ShoppingListModule {

}
