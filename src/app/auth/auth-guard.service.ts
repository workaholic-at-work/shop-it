import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/signin']);
            return false;
        }
        return true;
    }
}
