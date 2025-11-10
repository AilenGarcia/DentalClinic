import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  protected readonly userInfo = this.authService.usuarioInfo;
  protected readonly currentUser = this.authService.currentUserInfo;

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return !!this.userInfo();
  }

  typeUser(){
    return this.userInfo()?.role
  }

  get userNombre() {
    return this.currentUser()?.nombre?? '';
  }

  goToEditProfile() {
    const role = this.userInfo()?.role;
    if (role === 'ROLE_ODONTOLOGOS') {
      this.router.navigateByUrl('/editOdontologo');
    } else if (role === 'ROLE_PACIENTES') {
      this.router.navigateByUrl('/edit');
    } else {
      console.warn('Rol sin ruta de edición:', role);
      this.router.navigateByUrl('/home');
    }
  }

  
  goTo() {
    const role = this.userInfo()?.role;
    if (role === 'ROLE_ODONTOLOGOS') {
      this.router.navigateByUrl('/odontologos');
    } else if (role === 'ROLE_PACIENTES') {
      this.router.navigateByUrl('/pacientes');
    } else {
      this.router.navigateByUrl('/home');
    }
  }
}

