import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserResponse } from '../../../../services/models/user-response';
import { Paciente } from '../../../../services/models/paciente';
import { Odontologo } from '../../../../services/models/odontologo';
import { Turno } from '../../../../services/models/turnos';
import { Router, RouterLink } from "@angular/router";
import { UserServices } from '../../../../services/users/user-services';
import { TurnoServices } from '../../../../services/turnos/turno-services';
import { PacienteService } from '../../../../services/pacientes/paciente-services';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-turnos',
  standalone: true,
  templateUrl: './turnos-paciente.html',
  styleUrls: ['./turnos-paciente.css'],
  imports: [CommonModule, FormsModule, RouterLink]
})
export class TurnosPaciente implements OnInit {
  private readonly userService = inject(UserServices);
  private readonly turnoService = inject(TurnoServices);
  private readonly authService = inject(AuthService);
  private readonly pacienteService = inject(PacienteService);
  private readonly router = inject(Router);

  currentUser: UserResponse | null = null;
  currentPaciente: Paciente | null = null;
  odontologos: Odontologo[] = [];
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  turnosPaginados: Turno[] = [];
  filtroOdontologo: string = '';
  filtroFecha: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  // Modal properties
  mostrarModal: boolean = false;
  turnoSeleccionado: Turno | null = null;

  ngOnInit() {
    this.userService.getAllOdontologos().subscribe({
      next: (data) => {
        this.odontologos = data;
      },
      error: (err) => {
        console.error('Error al cargar odontólogos:', err);
      }
    });

    this.currentUser = this.authService.currentUserInfo();

    if (!this.currentUser || !this.currentUser.id) {
      console.error('No hay usuario autenticado o no tiene ID');
      alert('No se pudo obtener la información del usuario. Por favor, inicia sesión nuevamente.');
      this.router.navigate(['/login']);
      return;
    }

    this.pacienteService.getPacienteByUserId(this.currentUser.id).subscribe({
      next: (paciente) => {
        this.currentPaciente = paciente;

        if (!this.currentPaciente?.id) {
          console.error('El paciente no tiene ID');
          alert('No se pudo obtener la información del paciente.');
          return;
        }
        
        this.cargarTurnos(this.currentPaciente.id);
      },
      error: (err) => {
        console.error('Error al obtener paciente:', err);
        if (err.status === 403) {
          alert('No tienes permisos para acceder a esta información o no estás registrado como paciente.');
        } else if (err.status === 404) {
          alert('No se encontró un registro de paciente asociado a tu usuario.');
        } else {
          alert('Error al cargar la información del paciente.');
        }
        this.router.navigate(['/']);
      }
    });
  }

  private cargarTurnos(pacienteId: number) {
    
    this.turnoService.buscarPorPaciente(pacienteId).subscribe({
      next: (turnos) => {
        
        if (!turnos || turnos.length === 0) {
          this.turnos = [];
          this.turnosFiltrados = [];
          this.calcularPaginacion();
          return;
        }

        this.turnos = turnos;
        this.turnosFiltrados = [...this.turnos];
        
        this.calcularPaginacion();
      },
      error: (err) => {
        console.error('Error al recuperar turnos:', err);
        console.error('Status:', err.status);
        console.error('Message:', err.message);
        
        if (err.status === 404) {
          alert('No se encontraron turnos para este paciente.');
        } else if (err.status === 403) {
          alert('No tienes permisos para ver estos turnos.');
        } else {
          alert('Error al cargar los turnos. Por favor, intenta nuevamente.');
        }
      }
    });
  }

  limpiarFiltros() {
    this.filtroOdontologo = '';
    this.filtroFecha = '';
    this.turnosFiltrados = [...this.turnos];
    this.currentPage = 1;
    this.calcularPaginacion();
  }

  aplicarFiltros(): void {
    
    this.turnosFiltrados = this.turnos.filter(turno => {
      const coincideOdontologo =
        !this.filtroOdontologo || 
        String(turno.odontologo?.id) === String(this.filtroOdontologo);
      
      const coincideFecha =
        !this.filtroFecha || 
        this.compararFechasSinHora(turno.fechaTurno, this.filtroFecha);
      
      return coincideOdontologo && coincideFecha;
    });

    this.currentPage = 1;
    this.calcularPaginacion();
  }

  private compararFechasSinHora(fecha1: string, fecha2String: string): boolean {
    try {
      // Manejar diferentes formatos de fecha
      const f1 = new Date(fecha1).toISOString().split('T')[0];
      const f2 = new Date(fecha2String).toISOString().split('T')[0];
      return f1 === f2;
    } catch (error) {
      console.error('Error al comparar fechas:', error);
      return false;
    }
  }

  calcularPaginacion() {
    this.totalPages = Math.ceil(this.turnosFiltrados.length / this.pageSize) || 1;
    this.actualizarPagina();
  }

  actualizarPagina() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.turnosPaginados = this.turnosFiltrados.slice(startIndex, endIndex);
  }

  paginaAnterior() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.actualizarPagina();
    }
  }

  paginaSiguiente() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.actualizarPagina();
    }
  }

  verDetalles(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.turnoSeleccionado = null;
  }

  editarTurno(turno: Turno) {
    this.cerrarModal();
  }

  eliminarTurno(turno: Turno) {
    if (!turno || !turno.id) {
      return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar este turno?')) {
      this.turnoService.eliminar(turno.id).subscribe({
        next: () => {

          this.turnos = this.turnos.filter(t => t.id !== turno.id);
          this.turnosFiltrados = this.turnosFiltrados.filter(t => t.id !== turno.id);
          this.calcularPaginacion();
          
          if (this.turnosPaginados.length === 0 && this.currentPage > 1) {
            this.currentPage--;
            this.actualizarPagina();
          }

          this.cerrarModal();
          
          alert('Turno eliminado correctamente');
        },
        error: (err) => {
          console.error('Error al eliminar turno:', err);
          alert('Error al eliminar el turno. Por favor, intenta nuevamente.');
        }
      });
    }
  }

  formatearFecha(fecha: string): string {
    try {
      const opciones: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      };
      return new Date(fecha).toLocaleDateString('es-AR', opciones);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return fecha;
    }
  }
}