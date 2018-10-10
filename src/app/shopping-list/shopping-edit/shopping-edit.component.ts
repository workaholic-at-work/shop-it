import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  editIngredientSubscription: Subscription;
  editMode: boolean;
  editedIndex: number;
  editedIngredient: Ingredient;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editIngredientSubscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedIngredient = this.shoppingListService.getIngredient(index);
          this.editMode = true;
          this.editedIndex = index;
          this.shoppingListForm.setValue({
            'name': this.editedIngredient.name,
            'amount': this.editedIngredient.amount
          });
        }
      );
  }

  ngOnDestroy() {
    this.editIngredientSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.editMode) {
      this.shoppingListService.editIngredient(this.editedIndex,
          new Ingredient(this.shoppingListForm.value.name, +this.shoppingListForm.value.amount));
      this.editMode = false;
    } else {
      this.shoppingListService.addIngredient(new Ingredient(this.shoppingListForm.value.name, +this.shoppingListForm.value.amount));
    }
    this.shoppingListForm.reset();
  }

  deleteIngredient() {
    this.shoppingListService.deleteIngredient(this.editedIndex);
    this.editMode = false;
    this.shoppingListForm.reset();
  }
}
