import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../enviroments/enviroments';
import { User } from '../models/user';
import { AlertServices } from './alert-services';
import { LoginRequest } from './models/login-request';
import { AuthResponse } from './models/login-response';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly client = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertServices)
  private readonly API_URL = `${environment.apiUrl}`
  protected readonly userInfo = signal<{ email: string; role: string; userId: number } | null>(null);


  register(usuario: User) {
    this.client.post<string>(`${this.API_URL}/users/save`, usuario).subscribe({
      next: () => {
        this.alertService.showMessage('Usuario registrado correctamente. Usted será redirigido al login', 'success');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.alertService.showMessage('Error al registrar usuario', 'error');
        console.error(err);
      },
    });
  }


  login(credentials: LoginRequest) {
    this.client.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.accessToken);
          
          this.userInfo.set({
            email: response.email,
            role: response.role,
            userId: response.userId
          });

        }),
        catchError(error => {
          this.alertService.showMessage('Credenciales incorrectas o error de conexión', 'error');
          console.error('Error en login:', error);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (response) => {
          this.redirigirSegunRol(response.role);
        }
      });
  }

  private redirigirSegunRol(role: string) {
    switch(role) {
      case 'ROLE_PACIENTES':
        this.router.navigateByUrl('/pacientes');
        break;
      case 'ROLE_ODONTOLOGOS':
        this.router.navigateByUrl('/odontologos');
        break;
      default:
        console.warn('Rol desconocido:', role);
        this.alertService.showMessage('Rol de usuario no reconocido', 'warning');
        this.router.navigateByUrl('/');
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.userInfo.set(null);
    this.router.navigate(['/home']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  hasRole(role: string): boolean {
    return this.userInfo()?.role === role;
  }

  get usuarioInfo() {
    return this.userInfo.asReadonly();
  }

  get token() {
    return localStorage.getItem('token');
  }

  get userRole(): string | null {
    return this.userInfo()?.role || null;
  }

  get userId(): number | null {
    return this.userInfo()?.userId || null;
  }

  get userEmail(): string | null {
    return this.userInfo()?.email || null;
  }
}
