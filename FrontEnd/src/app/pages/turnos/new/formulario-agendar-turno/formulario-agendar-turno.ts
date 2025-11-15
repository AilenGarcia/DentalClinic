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
  private readonly alertService = inject(AlertServices);

  odontologos: Odontologo[] = [];
  fecha: string = '';
  hora: string = '';
  odontologoSeleccionado: Odontologo | null = null;
  currentUser: UserResponse | null = null;
  currentPaciente: Paciente | null = null;
  hoy: string = '';

  listaHorarios: string[] = [
    "10:00", "10:30", "11:00", "11:30", "12:00",
    "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  horasOcupadas: string[] = [];

  ngOnInit() {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0'); // meses 0-11
    const dd = String(now.getDate()).padStart(2, '0');

    this.hoy = `${yyyy}-${mm}-${dd}`;

    this.userService.getAllOdontologos().subscribe({
      next: data => this.odontologos = data,
      error: err => console.error('Error cargando odontólogos', err)
    });

    this.currentUser = this.authService.currentUserInfo();

    if (this.currentUser?.id) {
      this.pacienteService.getPacienteByUserId(this.currentUser.id).subscribe({
        next: paciente => this.currentPaciente = paciente,
        error: err => {
          if (err.status === 403) {
            this.alertService.showMessage(
              'No tienes permisos o no estás registrado como paciente.', 
              'error'
            );
          }
        }
      });
    } else {
      this.alertService.showMessage('Debes iniciar sesión para agendar un turno', 'error');
      this.router.navigateByUrl('/login');
    }
  }

  actualizarHorasOcupadas() {
    if (!this.fecha || !this.odontologoSeleccionado?.id) return;

    this.turnoService
      .getHorasOcupadas(this.fecha, this.odontologoSeleccionado.id)
      .subscribe({
        next: res => {
          this.horasOcupadas = res.horarios; // <- backend devuelve { horarios: [] }
        },
        error: () => {
          this.horasOcupadas = [];
          this.alertService.showMessage('No se pudieron cargar los horarios ocupados', 'error');
        }
      });
  }

  // horarios disponibles (el select mostrará estos)
  get horasDisponibles(): string[] {
    return this.listaHorarios.filter(h => !this.horasOcupadas.includes(h));
  }

  agregarTurno(): void {
    if (!this.currentPaciente) {
      this.alertService.showMessage('Error al cargar el paciente', 'error');
      return;
    }

    if (this.fecha && this.odontologoSeleccionado) {
      const nuevoTurno: Turno = {
        fechaTurno: this.fecha,
        horaTurno: this.hora,
        paciente: this.currentPaciente,
        odontologo: this.odontologoSeleccionado
      };

      this.turnoService.agregar(nuevoTurno).subscribe({
        next: () => {
          this.fecha = '';
          this.hora = '';
          this.odontologoSeleccionado = null;

          this.alertService.showMessage('¡Turno agregado exitosamente!', 'success');
          this.router.navigateByUrl("turnos/pacientes");
        },
        error: () => {
          this.alertService.showMessage('Error al agregar turno', 'error');
        }
      });
    } else {
      this.alertService.showMessage('Complete todos los campos', 'error');
    }
  }
}
