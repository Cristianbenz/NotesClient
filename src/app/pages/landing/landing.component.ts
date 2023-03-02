import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiAuthService } from '../../services/api-auth.service';

@Component({
  selector: "app-landing",
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  private authService = inject(ApiAuthService);
  private router = inject(Router);
  public formType: "signin" | "signup" = "signin";
  
  constructor() {
    if (this.authService.userData) this.router.navigate(['home'])
  }

  changeForm() {
    this.formType = this.formType === "signin"? "signup" : "signin";
  }
}
