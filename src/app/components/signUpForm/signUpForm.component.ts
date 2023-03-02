import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LandingComponent } from 'src/app/pages/landing/landing.component';
import { ApiAuthService } from 'src/app/services/api-auth.service';
import { comparePass } from 'src/app/tools/comparePass';

@Component({
  selector: 'app-signUp-form',
  templateUrl: './signUpForm.component.html',
  styleUrls: ['./signUpForm.component.scss'],
})
export class SignUpFormComponent {
  private formBuilder = inject(FormBuilder);
  private authService = inject(ApiAuthService);
  private landingComponent = inject(LandingComponent);

  public signUpForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: comparePass,
    }
  );

  signUp() {
    this.authService
      .signUp(this.signUpForm.getRawValue())
      .subscribe((result) => {
        if (result.success === 1) this.landingComponent.changeForm();
      });
  }
}
