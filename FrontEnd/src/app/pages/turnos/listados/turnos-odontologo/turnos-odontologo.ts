import { Component, OnInit } from '@angular/core';
import { Turno } from '../../../../models/turno';
import { User } from '../../../../models/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../../models/paciente';
import { Odontologo } from '../../../../models/odontologo';
import printJS from 'print-js';

const USER_PACIENTES: User[] = [
  { 
    id: 1, 
    nombre: 'Juan', 
    apellido: 'Pérez', 
    email: 'juan.perez@email.com', 
    password: 'pass123', 
    rol: 'PACIENTE' 
  },
  { 
    id: 2, 
    nombre: 'Ana', 
    apellido: 'Gómez', 
    email: 'ana.gomez@email.com', 
    password: 'pass123', 
    rol: 'PACIENTE' 
  }
];

// Usuarios para Odontólogos
const USER_ODONTOLOGOS: User[] = [
  { 
    id: 3, 
    nombre: 'Laura', 
    apellido: 'Ruiz', 
    email: 'laura.ruiz@clinica.com', 
    password: 'pass123', 
    rol: 'ODONTOLOGO' 
  },
  { 
    id: 4, 
    nombre: 'Carlos', 
    apellido: 'Pérez', 
    email: 'carlos.perez@clinica.com', 
    password: 'pass123', 
    rol: 'ODONTOLOGO' 
  }
];

const PACIENTES: Paciente[] = [
  { 
    id: 1, 
    telefono: '1122334455', 
    domicilio: 'Calle Falsa 123', 
    dni: '12345678', 
    fechaDeAlta: '2023-01-01',
    user: USER_PACIENTES[0]
  },
  { 
    id: 2, 
    telefono: '2233445566', 
    domicilio: 'Av. Siempre Viva 742', 
    dni: '87654321', 
    fechaDeAlta: '2023-02-15',
    user: USER_PACIENTES[1]
  }
];

const ODONTOLOGOS: Odontologo[] = [
  { 
    id: 1, 
    matricula: 'A123', 
    descripcion: 'Especialista en ortodoncia',
    user: USER_ODONTOLOGOS[0]
  },
  { 
    id: 2, 
    matricula: 'B456', 
    descripcion: 'Especialista en endodoncia',
    user: USER_ODONTOLOGOS[1]
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
  selector: 'app-turnos-odontologo',
  imports: [CommonModule, FormsModule],
  templateUrl: './turnos-odontologo.html',
  styleUrl: './turnos-odontologo.css'
})
export class TurnosOdontologo implements OnInit {

    odontologos = ODONTOLOGOS;
    pacientes = PACIENTES
    turnos = TURNOS;
    turnosFiltrados: Turno[] = [...TURNOS];
    turnosPaginados: Turno[] = [];
    filtroOdontologo: string = '';
    filtroPaciente: string = '';
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
      this.filtroPaciente = '';
      this.filtroFecha = '';
      this.turnosFiltrados = [...this.turnos];
      this.currentPage = 1;
      this.calcularPaginacion();
    }
  
    aplicarFiltros() {
      this.turnosFiltrados = this.turnos.filter(turno => {
        const coincidePaciente =
          !this.filtroPaciente || turno.paciente?.id === +this.filtroOdontologo;
        
        const coincideFecha = !this.filtroFecha || this.compararFechasSinHora(
          turno.fechaTurno,
          this.filtroFecha
        );
        
        return coincidePaciente && coincideFecha;
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

    imprimirTurnos() {

      const turnosParaImprimir = this.turnosFiltrados.map(t => ({
        fecha: t.fechaTurno,
        nombrePaciente: `${t.paciente?.user.nombre} ${t.paciente?.user.apellido}`,
        dni: t.paciente?.dni,
        email: t.paciente?.user.email,
        telefono: t.paciente?.telefono ?? '—'
      }))
      printJS({
        printable: turnosParaImprimir,
        type: 'json',
        properties: [
          { field: 'fecha', displayName: 'Fecha del Turno' },
          { field: 'nombrePaciente', displayName: 'Paciente' },
          { field: 'dni', displayName: 'DNI' },
          { field: 'email', displayName: 'Email' },
          { field: 'telefono', displayName: 'Teléfono' },
        ],
        header: `
          Listado de turnos
        `,
        style: `

            h1 {
              text-align: center;
              font-family: 'Segoe UI', Roboto, sans-serif;
              font-size: 22px;
              margin-bottom: 20px;
              color: #111827;
    }
          /* ====== Tabla principal ====== */
          table {
            width: 100%;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            border-collapse: collapse;
            margin-bottom: 24px;
            font-family: 'Segoe UI', Roboto, sans-serif;
          }
    
          thead {
            background: #f9fafb;
          }
    
          th {
            padding: 16px 24px;
            text-align: center;
            font-size: 0.875rem;
            font-weight: 600;
            color: #374151;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }
    
          /* ====== Columnas específicas ====== */
          th:nth-child(1), td:nth-child(1) {
            width: 10%;
          }
    
          th:nth-child(3), td:nth-child(3) {
            width: 15%;
          }
    
          tbody tr {
            border-bottom: 1px solid #f3f4f6;
            transition: background 0.2s;
          }
    
          tbody tr:last-child {
            border-bottom: none;
          }
    
          tbody tr:hover {
            background: #f9fafb;
          }
    
          td {
            padding: 16px 24px;
            font-size: 0.9375rem;
            color: #1a1a1a;
          }

          th, td{
            border: 1px solid #d1d5db;
          }
    
          /* ====== Página ====== */
          @page {
            size: A4;
            margin: 20mm;
          }
    
          body {
            background: #f3f4f6;
          }
        `,
      });
      
    }
  }

