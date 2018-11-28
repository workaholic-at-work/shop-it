import { DoLogin } from './../auth-store/auth.actions';
import { NgForm } from '@angular/forms';

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store/app.reducers';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    this.store.dispatch(new DoLogin(form.value));
  }
}
