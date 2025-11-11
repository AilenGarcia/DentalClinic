import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes('/auth/login') || req.url.includes('/users/save')) {
    return next(req);
  }

  const token = authService.usuarioInfo()?.accessToken;

  let clonedReq = req;
  if (token) {
    clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }

  /*
  return next(clonedReq).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        console.warn('Token inválido o sesión expirada');
        authService.logout();
      }
      return throwError(() => error);
    })
  );
  */
  return next(clonedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        console.warn('Token inválido o sesión expirada');
        authService.logout();
      }
      
      if (error.status === 403) {
        console.warn('Acceso denegado: sin permisos suficientes');
      }
      
      return throwError(() => error);
    })
  );
};
