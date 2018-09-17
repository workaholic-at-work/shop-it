import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() switchView = new EventEmitter<string>();
  currentView = 'recipesView';//shoppingListView
  constructor() { }

  ngOnInit() {
  }

  displayRecipes() {
    if(this.currentView != 'recipesView'){
      this.currentView = 'recipesView';
      this.switchView.emit('recipesView');
    }
  }

  displayShoppingList() {
    if(this.currentView != 'shoppingListView'){
      this.currentView = 'shoppingListView';
      this.switchView.emit('shoppingListView');
    }
  }
}
