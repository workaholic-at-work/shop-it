import { Injectable, OnInit } from '@angular/core';
import { CanActivate, Router, CanLoad, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthState } from './auth-store/auth.reducers';
import { AppState } from '../app-store/app.reducers';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

    constructor(private router: Router, private store: Store<AppState>) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth').pipe(
            take(1),
            map(
                (x: AuthState) => {
                    if (!x.isAuthenticated) {
                        this.router.navigate(['/signin']);
                    }
                    return x.isAuthenticated;
                }
            ));
    }

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth').pipe(
            take(1),
            map(
                (x: AuthState) => {
                    if (!x.isAuthenticated) {
                        this.router.navigate(['/signin']);
                    }
                    return x.isAuthenticated;
                }
            ));
    }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        return this.store.select('auth').pipe(
            map(
                (x: AuthState) => {
                    if (!x.isAuthenticated) {
                        this.router.navigate(['/signin']);
                    }
                    return x.isAuthenticated;
                }
            ));
    }
}
