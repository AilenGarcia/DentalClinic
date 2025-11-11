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
    // Cargar odontólogos
    this.userService.getAllOdontologos().subscribe({
      next: (data) => {
        this.odontologos = data;
      },
      error: (err) => {
        console.error('Error al cargar odontólogos', err);
      }
    });

    // Obtener usuario y paciente actual
    this.currentUser = this.authService.currentUserInfo();
    
    if (this.currentUser && this.currentUser.id) {
      this.pacienteService.getPacienteByUserId(this.currentUser.id).subscribe({
        next: (paciente) => {
          
          this.currentPaciente = paciente;
          console.log('Paciente cargado:', paciente);
        },
        error: (err) => {
          console.error('Error al obtener paciente:', err);
          // Si hay error 403, posiblemente el usuario no tiene permisos o no existe el paciente
          if (err.status === 403) {
            alert('No tienes permisos para acceder a esta información o no estás registrado como paciente.');
          }
        }
      });
    } else {
      console.error('No hay usuario autenticado');
      alert('Debes iniciar sesión para agendar un turno');
      this.router.navigateByUrl('/login');
    }
  }

  agregarTurno(): void {

    if (!this.currentPaciente) {
      console.error('❌ No hay paciente cargado');
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
        
        console.log('📦 Turno a enviar:', nuevoTurno);
        console.log('📤 Enviando petición al backend...');
        
        this.turnoService.agregar(nuevoTurno).subscribe({
          next: () => {
            console.log('✅ Turno agregado exitosamente en el backend');
            
            // Limpiar el formulario
            this.fecha = '';
            this.odontologoSeleccionado = null;
            console.log('🧹 Formulario limpiado');
            
            alert('¡Turno agregado exitosamente!');
            console.log('🔄 Navegando a turnos/pacientes');
            this.router.navigateByUrl("turnos/pacientes");
          },
          error: (err) => {
            console.error('❌ Error al agregar turno:', err);
            console.error('  - Status:', err.status);
            console.error('  - Message:', err.message);
            console.error('  - Error completo:', err);
            alert('Error al agregar el turno. Por favor intente nuevamente.');
          }
        });
      } else {
        console.error('❌ No se encontró el odontólogo');
        console.error('  - IDs disponibles:', this.odontologos.map(o => o.id));
        alert('Error: No se pudo encontrar el odontólogo seleccionado');
      }
    } else {
      console.warn('⚠️ Faltan campos por completar:');
      console.warn('  - fecha:', this.fecha ? '✅' : '❌');
      console.warn('  - odontologoSeleccionado:', this.odontologoSeleccionado ? '✅' : '❌');
      alert('Por favor complete todos los campos');
    }
    
    console.log('🏁 === FIN agregarTurno() ===');
  }

  formatearFecha(fecha: string): string {
    const [año, mes, dia] = fecha.split('-');
    return `${dia}/${mes}/${año}`;
  }

  verDetalles(id: number): void {
    console.log('Ver detalles del turno #' + id);
  }
}