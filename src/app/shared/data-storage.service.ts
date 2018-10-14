import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
    private authService: AuthService) { }

  storeRecipes(): Observable<any> {
    const token = this.authService.getToken();
    const recipes = this.recipeService.getRecipes();
    return this.httpClient.put('https://shop-it-63921.firebaseio.com/recipes.json?auth=' + token, recipes);
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.httpClient.get<Recipe[]>('https://shop-it-63921.firebaseio.com/recipes.json?auth=' + token)
      .pipe(
        map((recipes: Recipe[]) => {
          for (const recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        })
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
