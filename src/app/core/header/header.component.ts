import { AuthState } from './../../auth/auth-store/auth.reducers';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AuthService } from '../../auth/auth.service';
import { DataStorageService } from '../../shared/data-storage.service';
import { AppState } from '../../app-store/app.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authState: Observable<AuthState>;
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
   }

  saveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        x => console.log(x)
      );
  }

  fetchData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }
}
