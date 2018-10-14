import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CanActivate, Router, CanLoad, CanActivateChild } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/signin']);
            return false;
        }
        return true;
    }

    canLoad(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/signin']);
            return false;
        }
        return true;
    }

    canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/signin']);
            return false;
        }
        return true;
    }
}
