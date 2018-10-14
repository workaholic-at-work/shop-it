import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorageService: DataStorageService,
    private authService: AuthService) { }

  ngOnInit() { }

  saveData() {
    this.dataStorageService.storeRecipes()
      .subscribe();
  }

  fetchData() {
    this.dataStorageService.getRecipes();
  }

  logout() {
    this.authService.logout();
  }
}
