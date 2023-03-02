import { AbstractControl } from "@angular/forms";

export function comparePass(control : AbstractControl) {
    const PASS = control.get('password')?.value;
    const CONFIRM_PASS = control.get('confirmPassword')?.value;
    if (PASS !== CONFIRM_PASS) {
      return {passNotMatch: true}
    }
    
    return null;
}