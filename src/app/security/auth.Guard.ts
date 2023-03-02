import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { ApiAuthService } from '../services/api-auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: ApiAuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot) {
        if (this.authService.userData) return true;
        
        this.router.navigate(['']);
        return false;
    }
}