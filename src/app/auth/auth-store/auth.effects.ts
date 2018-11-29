import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import * as firebase from 'firebase';

import * as AuthActions from './auth.actions';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
	@Effect()
	authSignup = this.actions$
		.ofType(AuthActions.DO_SIGNUP)
		.pipe(
			map((action: AuthActions.DoSignup) => {
				return action.payload;
			}),
			switchMap((authData: { username: string, password: string }) => {
				return from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
			}),
			switchMap(() => {
				return from(firebase.auth().currentUser.getIdToken());
			}),
			mergeMap((token: string) => {
				this.router.navigate(['/']);
				return [
					{
						type: AuthActions.SIGNUP
					},
					{
						type: AuthActions.SET_TOKEN,
						payload: token
					}
				];
			})
		);

	@Effect()
	authSignin = this.actions$
		.ofType(AuthActions.DO_LOGIN)
		.pipe(
			map((action: AuthActions.DoLogin) => {
				return action.payload;
			}),
			switchMap((authData: { username: string, password: string }) => {
				return from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
			}),
			switchMap(() => {
				return from(firebase.auth().currentUser.getIdToken());
			}),
			mergeMap((token: string) => {
				this.router.navigate(['/']);
				return [
					{
						type: AuthActions.LOGIN
					},
					{
						type: AuthActions.SET_TOKEN,
						payload: token
					}
				];
			})
		);

	@Effect({ dispatch: false })
	onLogout = this.actions$
		.ofType(AuthActions.LOGOUT)
		.pipe(
			tap(() => {
				this.router.navigate(['/signin']);
			})
		);
	constructor(private actions$: Actions, private router: Router) {

	}
}
