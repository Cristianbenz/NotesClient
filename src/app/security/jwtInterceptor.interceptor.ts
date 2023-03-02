import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { ApiAuthService } from '../services/api-auth.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private user : User | null = null;
    constructor(private authService: ApiAuthService) {
        this.authService.user.subscribe(data => this.user = data);
    };

    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        if(this.user) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.user.token}`
                }
            });
        }
        return next.handle(req);
    }
}