import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

export const publicOnlyGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();
  const user = authService.usuarioInfo();

  if (isAuthenticated && user) {
    const rol = user.role;
    
    if (rol === 'ROLE_ODONTOLOGOS') {
      router.navigate(['/odontologos']);
    } else if (rol === 'ROLE_PACIENTES') {
      router.navigate(['/pacientes']);
    } else {
      router.navigate(['/home']);
    }

    return false;
  }

  return true;
};

