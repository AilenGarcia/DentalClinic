import { Component, effect, inject } from '@angular/core';
import { UserServices } from '../../services/users/user-services';
import { Paciente } from '../../services/models/paciente';
import { toSignal } from '@angular/core/rxjs-interop';
import { TurnoServices } from '../../services/turnos/turno-services';

@Component({
  selector: 'app-pacientes',
  imports: [],
  templateUrl: './pacientes.html',
  styleUrl: './pacientes.css'
})
export class Pacientes {
  private readonly userService = inject(UserServices);
  private readonly turnoService = inject(TurnoServices)

  pacientes: Paciente[] = [];
  pacientesPaginados: Paciente[] = [];
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  cargando = true;
  
  // Modal properties
  mostrarFicha: boolean = false;
  pacienteSeleccionado: Paciente | null = null;
  turnosAnterioresAHoy: Number | null = null;
  
  private readonly pacientes$ = this.userService.getAllPacientes();
  protected readonly signalPacientes = toSignal(this.pacientes$, { initialValue: null });

  constructor() {
    effect(() => {
      const data = this.signalPacientes();
      if (data) {
        this.pacientes = data;
        this.calcularPaginacion();
        this.cargando = false;
      }
    });
  }
  
  calcularPaginacion() {
    this.totalPages = Math.ceil(this.pacientes.length / this.pageSize) || 1;
    this.actualizarPagina();
  }
  
  actualizarPagina() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pacientesPaginados = this.pacientes.slice(startIndex, endIndex);
  }
  
  verFichaCompleta(paciente: Paciente) {
    this.pacienteSeleccionado = paciente;
    this.calcularTurnosPorPaciente(paciente);
    this.mostrarFicha = true;
  }

  calcularTurnosPorPaciente(paciente: Paciente) {
    this.turnoService.buscarPorPaciente(paciente.id!).subscribe({
      next: (turnos) => {
    
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);
    
        this.turnosAnterioresAHoy = turnos.filter(t => {
          const [y, m, d] = t.fechaTurno.split('-').map(Number);
          const fecha = new Date(y, m - 1, d);
          return fecha < hoy;
        }).length;
      }
    });
  }
  
  cerrarFicha() {
    this.mostrarFicha = false;
    this.pacienteSeleccionado = null;
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