import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiAuthService } from 'src/app/services/api-auth.service';

@Component({
    selector: 'app-signIn-form',
    templateUrl: './signInForm.component.html',
    styleUrls: ['./signInForm.component.scss']
})
export class SignInFormComponent {
    private formBuilder = inject(FormBuilder);
    private authService = inject(ApiAuthService);
    private router = inject(Router);
    public loginForm = this.formBuilder.group({
        email: ["", [
          Validators.required,
          Validators.email
        ]],
        password: ["", [
          Validators.required,
          Validators.minLength(6)
        ]]
    })

    authenticate() {
    this.authService.signIn(this.loginForm.getRawValue())
    .subscribe(response => {
        if (response.success) this.router.navigate(['home'])
    });
    }
}