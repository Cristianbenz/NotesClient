import { Component } from '@angular/core';
import { User } from './models/user';
import { ApiAuthService } from './services/api-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notes';
  user : User | null = null;

  constructor(private authService: ApiAuthService) {
    this.authService.user.subscribe(data => {
      this.user = data;
    })
  }
}
