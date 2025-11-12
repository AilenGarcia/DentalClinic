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

@Component({
  selector: 'app-nuevo-turno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario-agendar-turno.html',
  styleUrls: ['./formulario-agendar-turno.css']
})
export class FormularioAgendarTurno {
  private readonly authService = inject(AuthService);
  private readonly userService = inject(UserServices);
  private readonly turnoService = inject(TurnoServices);
  private readonly pacienteService = inject(PacienteService);
  private readonly router = inject(Router);

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
            alert('No tienes permisos para acceder a esta información o no estás registrado como paciente.');
          }
        }
      });
    } else {
      alert('Debes iniciar sesión para agendar un turno');
      this.router.navigateByUrl('/login');
    }
  }

  agregarTurno(): void {

    if (!this.currentPaciente) {
      alert('Error: No se pudo cargar la información del paciente');
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
            
            alert('¡Turno agregado exitosamente!');
            this.router.navigateByUrl("turnos/pacientes");
          },
          error: () => {
            alert('Error al agregar el turno. Por favor intente nuevamente.');
          }
        });
      } else {
        alert('Error: No se pudo encontrar el odontólogo seleccionado');
      }
    } else {
      alert('Por favor complete todos los campos');
    }
  }
}