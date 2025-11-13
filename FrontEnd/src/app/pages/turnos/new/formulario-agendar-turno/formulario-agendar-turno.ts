import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Turno } from '../../../../services/models/turnos';
import { Odontologo } from '../../../../services/models/odontologo';
import { AuthService } from '../../../../services/auth-service';
import { UserServices } from '../../../../services/users/user-services';
import { TurnoServices } from '../../../../services/turnos/turno-services';
import { PacienteService } from '../../../../services/pacientes/paciente-services';
import { Paciente } from '../../../../services/models/paciente';
import { UserResponse } from '../../../../services/models/user-response';
import { Router } from '@angular/router';
import { AlertBanner } from "../../../../components/banner/alert-banner/alert-banner";
import { AlertServices } from '../../../../services/alert-services';

@Component({
  selector: 'app-nuevo-turno',
  standalone: true,
  imports: [CommonModule, FormsModule, AlertBanner],
  templateUrl: './formulario-agendar-turno.html',
  styleUrls: ['./formulario-agendar-turno.css']
})
export class FormularioAgendarTurno {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserServices);
  private readonly turnoService = inject(TurnoServices);
  private readonly pacienteService = inject(PacienteService);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertServices)

  odontologos: Odontologo[] = [];
  fecha: string = '';
  odontologoSeleccionado: Odontologo | null = null;;
  currentUser: UserResponse | null = null;
  currentPaciente: Paciente | null = null;

  ngOnInit() {
    this.userService.getAllOdontologos().subscribe({
      next: (data) => {
        this.odontologos = data;
      },
      error: (err) => {
        console.error('Error al cargar odontólogos', err);
      }
    });

    this.currentUser = this.authService.currentUserInfo();
    
    if (this.currentUser && this.currentUser.id) {
      this.pacienteService.getPacienteByUserId(this.currentUser.id).subscribe({
        next: (paciente) => {
          this.currentPaciente = paciente;
        },
        error: (err) => {
          if (err.status === 403) {
            this.alertService.showMessage('No tienes permisos para acceder a esta información o no estás registrado como paciente.', 'error');
          }
        }
      });
    } else {
      this.alertService.showMessage('Debes iniciar sesión para agendar un turno', 'error');
      this.router.navigateByUrl('/login');
    }
  }

  agregarTurno(): void {

    if (!this.currentPaciente) {
      this.alertService.showMessage('Error: No se pudo cargar la información del paciente', 'error');
      return;
    }
  
    if (this.fecha && this.odontologoSeleccionado) {
      
      if (this.odontologoSeleccionado) {
        
        const nuevoTurno: Turno = {
          fechaTurno: this.fecha,
          paciente: this.currentPaciente,
          odontologo: this.odontologoSeleccionado
        };
                
        this.turnoService.agregar(nuevoTurno).subscribe({
          next: () => {
            
            this.fecha = '';
            this.odontologoSeleccionado = null;
            this.alertService.showMessage('¡Turno agregado exitosamente!', 'success');

            this.router.navigateByUrl("turnos/pacientes");
          },
          error: () => {
            this.alertService.showMessage('Error al agregar el turno. Por favor intente nuevamente.', 'error');
          }
        });
      } else {
        this.alertService.showMessage('Error: No se pudo encontrar el odontólogo seleccionado', 'error');
      }
    } else {
      this.alertService.showMessage('Por favor complete todos los campos', 'error');
    }
  }
}