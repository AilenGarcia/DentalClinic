import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { AlertServices } from '../alert-services';
import { Router } from '@angular/router';
import { ChangePassword } from '../models/change-password';
import { catchError, tap, throwError } from 'rxjs';
import { Odontologo } from '../models/odontologo';
import { Paciente } from '../models/paciente';
import { AuthService } from '../auth-service';

@Injectable({
  providedIn: 'root'
})

export class UserServices {
  private readonly client = inject(HttpClient);
  private readonly alertService = inject(AlertServices);
  private readonly router = inject(Router)
  private readonly authService = inject(AuthService);
  private readonly API_URL = `${environment.apiUrl}`;
  

changePassword(credentials: ChangePassword) {
  return this.client.post(`${this.API_URL}/users/updatePassword`, credentials).pipe(
    tap(() => {
      this.alertService.showMessage('Contraseña modificada correctamente.', 'success');
    }),
    catchError((err) => {
      this.alertService.showMessage('Error al modificar contraseña', 'error');
      console.error(err);
      return throwError(() => err);
    })
  );
}

findByIdOdontologo(id: number){
  return this.client.get<Odontologo>(`${this.API_URL}/odontologos/findBy/${id}`)
}


findByIdPaciente(id: number){
  return this.client.get<Paciente>(`${this.API_URL}/pacientes/findBy/${id}`)
}

  updateOdontologo(usuario: Odontologo) {
    this.client.put<string>(`${this.API_URL}/odontologos/update`, usuario).subscribe({
      next: () => {
        this.authService.updateCurrentUser({
          nombre: usuario.users.nombre,
          apellido: usuario.users.apellido,
          email: usuario.users.email
        });
        this.alertService.showMessage('Odontologo actualizado correctamente. Usted será redirigido al inicio', 'success');

        setTimeout(() => {
          this.router.navigate(['/odontologos']);
        }, 2000);
      },
      error: (err) => {
        this.alertService.showMessage('Error al actualizar usuario', 'error');
        console.error(err);
      },
    });
  }

  
  updatePaciente(usuario: Paciente) {
    this.client.put<string>(`${this.API_URL}/pacientes/update`, usuario).subscribe({
      next: () => {
        this.authService.updateCurrentUser({
          nombre: usuario.users.nombre,
          apellido: usuario.users.apellido,
          email: usuario.users.email
        });
        this.alertService.showMessage('Paciente actualizado correctamente. Usted será redirigido al inicio', 'success');

        setTimeout(() => {
          this.router.navigate(['/pacientes']);
        }, 2000);
      },
      error: (err) => {
        this.alertService.showMessage('Error al actualizar usuario', 'error');
        console.error(err);
      },
    });
  }

  getAllOdontologos(){
    return this.client.get<Odontologo[]>(`${this.API_URL}/odontologos/list`);
  }

    deleteUser(id: number) {
    this.client.delete<string>(`${this.API_URL}/users/delete/${id}`).subscribe({
      next: () => {
        this.alertService.showMessage('Usuario eliminado correctamente.', 'success');

          this.authService.logout();
      },
      error: (err) => {
        this.alertService.showMessage('No es posible eliminar este usuario. Pruebe mas tarde.', 'error');
        console.error(err);
      },
    });
  }

  getAllPacientes(){
    return this.client.get<Paciente[]>(`${this.API_URL}/pacientes/list`);
  }


}
