import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: this.passwordMatchValidator,
      }
    );
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPassword.setErrors(null);
      return null;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const username = this.form.value.username;
      const password = this.form.value.password;

      // Llamar al servicio de autenticación para registrar un nuevo usuario
      const isRegistered = this.authService.register(username, password);

      if (isRegistered) {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Ahora puedes iniciar sesión con tu nuevo usuario.',
          showConfirmButton: false,
          timer: 3000,
          toast: true,
        }).then(() => {
          this.router.navigate(['/login']);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'El usuario ya está registrado. Por favor, elige otro nombre de usuario.',
          confirmButtonText: 'Entendido',
          toast: true,
        });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
