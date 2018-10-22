import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

import { LoginAction, SetToken, LogoutAction } from './auth-store/auth.actions';
import { AppState } from '../app-store/app.reducers';
@Injectable()
export class AuthService {

    constructor(private router: Router, private store: Store<AppState>) { }

    signUp(username: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .then(
                response => {
                    this.router.navigate(['/signin']);
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    signIn(username: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(
                response => {
                    this.store.dispatch(new LoginAction());
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.store.dispatch(new SetToken(token));
                                this.router.navigate(['/']);
                            }
                        );
                }
            ).catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new LogoutAction());
        this.router.navigate(['/signin']);
    }
}
