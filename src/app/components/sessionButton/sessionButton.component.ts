import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ApiAuthService } from '../../services/api-auth.service';

@Component({
    selector: 'app-session-button',
    templateUrl: './sessionButton.component.html'
})
export class SessionButtonComponent {
    user : User | null = null;
    constructor(
        private authService: ApiAuthService,
        private router: Router
    ){
        this.authService.user.subscribe(data => {
            this.user = data;
          })
    }

    signOut() {
        this.authService.signOut();
        this.router.navigate(['/']);
    }
}