import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/auth-service';


export const roleGuard = (allowedRoles: string[]): CanActivateFn => {
  return (route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    
    const user = authService.usuarioInfo();
    
    if (user && allowedRoles.includes(user.role)) {
      return true;
    }
    
    router.navigate(['/unauthorized']);
    return false;
  };
};