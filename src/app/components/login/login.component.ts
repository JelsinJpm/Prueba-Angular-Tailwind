import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const username = this.form.value.username;
      const password = this.form.value.password;

      this.loading = true;

      setTimeout(() => {
        this.loading = false;

        const isLoggedIn = this.authService.login(username, password);

        if (isLoggedIn) {
          this.router.navigate(['/main']);
          Swal.fire({
            icon: 'success',
            title: '¡Inicio de sesión exitoso!',
            text: '¡Bienvenido/a de nuevo!',
            showConfirmButton: false,
            timer: 3000,
            toast: true,
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: '¡Credenciales inválidas!',
            text: 'Por favor verifica tu usuario o contraseña.',
            confirmButtonText: 'Entendido',
            toast: true,
          });
        }
      }, 2000);
    } else {
      this.form.markAllAsTouched();
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
