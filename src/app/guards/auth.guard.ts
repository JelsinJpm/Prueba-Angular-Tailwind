import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthRoute = state.url.includes('/main');
  const isLoginOrRegisterRoute = state.url.includes('/login') || state.url.includes('/register');

  if (isAuthRoute) {
    if (authService.isAuthenticatedUser()) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  }

  if (isLoginOrRegisterRoute) {
    if (authService.isAuthenticatedUser()) {
      router.navigate(['/main']);
      return false;
    } else {
      return true;
    }
  }

  return true;
};
