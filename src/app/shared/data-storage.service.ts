import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

  storeRecipes(): Observable<any> {
    const recipes = this.recipeService.getRecipes();
    return this.httpClient.put('https://shop-it-4949f.firebaseio.com/recipes.json', recipes);
  }
}
