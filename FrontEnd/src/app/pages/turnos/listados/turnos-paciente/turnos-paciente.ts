import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserResponse } from '../../../../services/models/user-response';
import { Paciente } from '../../../../services/models/paciente';
import { Odontologo } from '../../../../services/models/odontologo';
import { Turno } from '../../../../services/models/turnos';


// Usuarios para Pacientes
const USER_PACIENTES: UserResponse[] = [
  { 
    id: 1, 
    nombre: 'Juan', 
    apellido: 'Pérez', 
    email: 'juan.perez@email.com'
  },
  { 
    id: 2, 
    nombre: 'Ana', 
    apellido: 'Gómez', 
    email: 'ana.gomez@email.com'
  }
];

// Usuarios de odontólogos
const USER_ODONTOLOGOS: UserResponse[] = [
  { 
    id: 3, 
    nombre: 'Laura', 
    apellido: 'Ruiz', 
    email: 'laura.ruiz@clinica.com'
  },
  { 
    id: 4, 
    nombre: 'Carlos', 
    apellido: 'Pérez', 
    email: 'carlos.perez@clinica.com'
  }
];

// Pacientes
const PACIENTES: Paciente[] = [
  { 
    id: 1, 
    telefono: '1122334455', 
    domicilio: 'Calle Falsa 123', 
    dni: '12345678',
    users: USER_PACIENTES[0]
  },
  { 
    id: 2, 
    telefono: '2233445566', 
    domicilio: 'Av. Siempre Viva 742', 
    dni: '87654321',
    users: USER_PACIENTES[1]
  }
];

// Odontólogos
const ODONTOLOGOS: Odontologo[] = [
  { 
    id: '1', 
    telefono: '1133557799',
    matricula: 'A123', 
    descripcion: 'Especialista en ortodoncia',
    users: USER_ODONTOLOGOS[0]
  },
  { 
    id: '2', 
    telefono: '1144668800',
    matricula: 'B456', 
    descripcion: 'Especialista en endodoncia',
    users: USER_ODONTOLOGOS[1]
  }
];

const TURNOS: Turno[] = [
  { id: 1, fechaTurno: '2025-11-03', paciente: PACIENTES[0], odontologo: ODONTOLOGOS[0] },
  { id: 2, fechaTurno: '2025-11-05', paciente: PACIENTES[1], odontologo: ODONTOLOGOS[1] },
  { id: 3, fechaTurno: '2025-11-07', paciente: PACIENTES[0], odontologo: ODONTOLOGOS[1] },
  { id: 4, fechaTurno: '2025-11-10', paciente: PACIENTES[1], odontologo: ODONTOLOGOS[0] },
  { id: 5, fechaTurno: '2025-11-07', paciente: PACIENTES[0], odontologo: ODONTOLOGOS[1] },
  { id: 6, fechaTurno: '2025-11-07', paciente: PACIENTES[0], odontologo: ODONTOLOGOS[1] },
  { id: 7, fechaTurno: '2025-11-07', paciente: PACIENTES[0], odontologo: ODONTOLOGOS[1] }
];

@Component({
  selector: 'app-turnos',
  standalone: true,
  templateUrl: './turnos-paciente.html',
  styleUrls: ['./turnos-paciente.css'],
  imports: [CommonModule, FormsModule]
})
export class TurnosPaciente implements OnInit {
  odontologos = ODONTOLOGOS;
  turnos = TURNOS;
  turnosFiltrados: Turno[] = [...TURNOS];
  turnosPaginados: Turno[] = [];
  filtroOdontologo: string = '';
  filtroFecha: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  // ⭐ Nuevas propiedades para el modal
  mostrarModal: boolean = false;
  turnoSeleccionado: Turno | null = null;

  ngOnInit() {
    this.calcularPaginacion();
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
        !this.filtroOdontologo || String(turno.odontologo?.id) === String(this.filtroOdontologo);
      
      const coincideFecha =
        !this.filtroFecha || this.compararFechasSinHora(turno.fechaTurno, this.filtroFecha);
      
      return coincideOdontologo && coincideFecha;
    });
  
    this.currentPage = 1;
    this.calcularPaginacion();
  }
  

  private compararFechasSinHora(fecha1: string, fecha2String: string): boolean {
    const f1 = fecha1.split('T')[0];
    const f2 = fecha2String.split('T')[0];
    return f1 === f2;
  }

  calcularPaginacion() {
    this.totalPages = Math.ceil(this.turnosFiltrados.length / this.pageSize);
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

  // ⭐ Métodos para el modal de detalles
  verDetalles(turno: Turno) {
    this.turnoSeleccionado = turno;
    this.mostrarModal = true;
  
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.turnoSeleccionado = null;
  }

  editarTurno(turno: Turno) {
    console.log('Editar turno:', turno);
    // Aquí implementarás la lógica de edición
    // Por ahora solo cierra el modal
    this.cerrarModal();
  }

  eliminarTurno(turno: Turno) {
    if (confirm('¿Estás seguro de que deseas eliminar este turno?')) {
      // Eliminar del array principal
      const indexTurnos = this.turnos.findIndex(t => t.id === turno.id);
      if (indexTurnos > -1) {
        this.turnos.splice(indexTurnos, 1);
      }

      // Eliminar del array filtrado
      const indexFiltrados = this.turnosFiltrados.findIndex(t => t.id === turno.id);
      if (indexFiltrados > -1) {
        this.turnosFiltrados.splice(indexFiltrados, 1);
      }

      // Recalcular paginación
      this.calcularPaginacion();
      
      // Si la página actual queda vacía, volver a la anterior
      if (this.turnosPaginados.length === 0 && this.currentPage > 1) {
        this.currentPage--;
        this.actualizarPagina();
      }

      // Cerrar modal
      this.cerrarModal();
    }
  }

  // ⭐ Método auxiliar para formatear fecha
  formatearFecha(fecha: string): string {
    const opciones: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(fecha).toLocaleDateString('es-AR', opciones);
  }
}