import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { INTERNAL_BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from '@angular/platform-browser-dynamic/src/platform_providers';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent implements OnInit {
  editMode = false;
  descriptionValidator = {
    minlength: 20,
    maxlength: 40
  };
  descriptionMinlenght = 20;
  constructor(private route: ActivatedRoute) { }

  recipeForm: FormGroup;

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          const id = +params['id'];
          this.editMode = params['id'] != null;
        }
      );
      this.initForm();
  }

  initForm() {
    this.recipeForm = new FormGroup({
      'recipeInfo': new FormGroup({
        'name': new FormControl(null),
        'imagePath': new FormControl(null),
        'description': new FormControl(null)
      })
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }
}
