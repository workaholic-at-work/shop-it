import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {
    token: string;

    constructor(private router: Router) { }

    signUp(username: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(username, password)
            .catch(
                error => console.log(error)
            );
    }

    signIn(username: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(username, password)
            .then(
                response => {
                    console.log(response);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.token = token;
                                this.router.navigate(['\recipes']);
                            }
                        );
                }
            ).catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/signin']);
    }

    getToken(): string {
        firebase.auth().currentUser.getIdToken()
            .then(
                (token: string) => this.token = token
            );
        return this.token;
    }

    isAuthenticated(): boolean {
        return this.token != null;
    }

}
