import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../../../models/paciente';
import { Odontologo } from '../../../../models/odontologo';
import { Turno } from '../../../../models/turno';

const PACIENTES: Paciente[] = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', domicilio: 'Calle Falsa 123', dni: '12345678', fechaDeAlta: new Date('2023-01-01') },
  { id: 2, nombre: 'Ana', apellido: 'Gómez', domicilio: 'Av. Siempre Viva 742', dni: '87654321', fechaDeAlta: new Date('2023-02-15') }
];

const ODONTOLOGOS: Odontologo[] = [
  { id: 1, nombre: 'Laura', apellido: 'Ruiz', matricula: 'A123', rol: 'Odontologo' },
  { id: 2, nombre: 'Carlos', apellido: 'Pérez', matricula: 'B456', rol: 'Odontologo' }
];

const TURNOS: Turno[] = [
  // ⭐ Usa hora local específica para evitar problemas de zona horaria
  { id: 1, fechaTurno: new Date(2025, 10, 3), users: PACIENTES[0], odontologo: ODONTOLOGOS[0]},
  { id: 2, fechaTurno: new Date(2025, 10, 5), users: PACIENTES[1], odontologo: ODONTOLOGOS[1]},
  { id: 3, fechaTurno: new Date(2025, 10, 7), users: PACIENTES[0], odontologo: ODONTOLOGOS[1]},
  { id: 4, fechaTurno: new Date(2025, 10, 10), users: PACIENTES[1], odontologo: ODONTOLOGOS[0]},
  { id: 5, fechaTurno: new Date(2025, 10, 7), users: PACIENTES[0], odontologo: ODONTOLOGOS[1]},
  { id: 6, fechaTurno: new Date(2025, 10, 7), users: PACIENTES[0], odontologo: ODONTOLOGOS[1]},
  { id: 7, fechaTurno: new Date(2025, 10, 7), users: PACIENTES[0], odontologo: ODONTOLOGOS[1]}
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

  aplicarFiltros() {
    this.turnosFiltrados = this.turnos.filter(turno => {
      const coincideOdontologo =
        !this.filtroOdontologo || turno.odontologo.id === +this.filtroOdontologo;
      
      const coincideFecha = !this.filtroFecha || this.compararFechasSinHora(
        turno.fechaTurno,
        this.filtroFecha
      );

      return coincideOdontologo && coincideFecha;
    });
    
    this.currentPage = 1;
    this.calcularPaginacion();
  }

  // ⭐ Método para comparar solo fechas, ignorando horas y zonas horarias
  private compararFechasSinHora(fecha1: Date, fecha2String: string): boolean {
    const f1 = new Date(fecha1);
    const f2 = new Date(fecha2String + 'T00:00:00'); // Agrega hora local
    
    return (
      f1.getFullYear() === f2.getFullYear() &&
      f1.getMonth() === f2.getMonth() &&
      f1.getDate() === f2.getDate()
    );
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
}