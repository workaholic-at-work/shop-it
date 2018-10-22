import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '../../app-store/app.reducers';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list-store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  editIngredientSubscription: Subscription;
  editMode: boolean;
  editedIngredient: Ingredient;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.editIngredientSubscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedIngredient = data.editedIngredient;
            this.editMode = true;
            this.shoppingListForm.setValue({
              'name': this.editedIngredient.name,
              'amount': this.editedIngredient.amount
            });
          } else {
            this.editMode = false;
          }
        }
      );
  }

  ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.editIngredientSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(
        new Ingredient(this.shoppingListForm.value.name, +this.shoppingListForm.value.amount)));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(
        new Ingredient(this.shoppingListForm.value.name, +this.shoppingListForm.value.amount)));
    }
    this.shoppingListForm.reset();
  }

  deleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.editMode = false;
    this.shoppingListForm.reset();
  }
}
