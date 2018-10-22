import { AuthState } from './auth-store/auth.reducers';
import { switchMap, take } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';

import { AppState } from '../app-store/app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth').pipe(
            take(1),
            switchMap((authState: AuthState) => {
                const copiedRequest = req.clone({params: new HttpParams().set('auth', authState.token)});
                return next.handle(copiedRequest);
            })
        );
    }
}
