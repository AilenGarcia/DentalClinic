import { Component, effect, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import printJS from 'print-js';
import { Odontologo } from '../../../../services/models/odontologo';
import { Turno } from '../../../../services/models/turnos';
import { UserResponse } from '../../../../services/models/user-response';
import { UserServices } from '../../../../services/users/user-services';
import { TurnoServices } from '../../../../services/turnos/turno-services';
import { AuthService } from '../../../../services/auth-service';
import { PacienteService } from '../../../../services/pacientes/paciente-services';
import { Router } from '@angular/router';
import { Paciente } from '../../../../services/models/paciente';
import { OdontologoService } from '../../../../services/odontologos/odontologo-services';
import { MatDialog } from '@angular/material/dialog';
import { AlertServices } from '../../../../services/alert-services';
import { ConfirmDialogComponent } from '../../../../components/confirm-dialog-component/confirm-dialog-component';
import { AlertBanner } from "../../../../components/banner/alert-banner/alert-banner";
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-turnos-odontologo',
  imports: [CommonModule, FormsModule, AlertBanner],
  templateUrl: './turnos-odontologo.html',
  styleUrl: './turnos-odontologo.css'
})
export class TurnosOdontologo{

  private readonly userService = inject(UserServices);
  private readonly turnoService = inject(TurnoServices);
  private readonly authService = inject(AuthService);
  private readonly pacienteService = inject(PacienteService);
  private readonly odontologoService = inject(OdontologoService);
  private readonly router = inject(Router);
  private readonly matDialog = inject(MatDialog)
  private readonly alertService = inject(AlertServices)
  protected readonly currentUser = this.authService.currentUserInfo;

  currentOdontologo: Odontologo | null = null;
  pacientes: Paciente[] = [];
  turnos: Turno[] = [];
  turnosFiltrados: Turno[] = [];
  turnosPaginados: Turno[] = [];
  filtroPaciente: string = '';
  filtroFecha: string = '';
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;
  cargando = false;


  // Modal properties
  mostrarModal: boolean = false;
  turnoSeleccionado: Turno | null = null;


  private readonly pacientes$ = this.userService.getAllPacientes();
  protected readonly signalPacientes = toSignal(this.pacientes$, { initialValue: null });

  constructor() {
    effect(() => {
      const data = this.signalPacientes();
      if (data) {
        this.pacientes = data;
      }
    });

    effect(() => {
      const user = this.authService.currentUserInfo();
      if (user && user.id !== undefined) {
        this.odontologoService.getOdontologoByUserId(user.id).subscribe({
          next: (odontologo) => {
            this.currentOdontologo = odontologo;
            if (odontologo?.id) {
              this.cargarTurnos(odontologo.id);
            }
          },
          error: (err) => {
            console.error('Error al cargar odontologo:', err);
            this.cargando = false;
          }
        });
      }
    });
  }

  private cargarTurnos(odontologoId: number) {
    
    this.turnoService.buscarPorOdontologo(odontologoId).subscribe({
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
      }
    });
  }
  
    limpiarFiltros() {
      this.filtroPaciente = '';
      this.filtroFecha = '';
      this.turnosFiltrados = [...this.turnos];
      this.currentPage = 1;
      this.calcularPaginacion();
    }
  
    aplicarFiltros() {
      this.turnosFiltrados = this.turnos.filter(turno => {
        const coincidePaciente =
          !this.filtroPaciente || turno.paciente?.id === +this.filtroPaciente;
        
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
        if (!turno || !turno.id) {
          return;
        }

              const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
                width: '350px',
                data: {
                  title: 'Eliminar turno',
                  message: '¿Desea eliminar el turno?',
                },
              });
            
              dialogRef.afterClosed().subscribe((confirmed) => {
                if (confirmed) {
                this.turnoService.eliminar(turno.id!).subscribe({
                  next: () => {
          
                    this.turnos = this.turnos.filter(t => t.id !== turno.id);
                    this.turnosFiltrados = this.turnosFiltrados.filter(t => t.id !== turno.id);
                    this.calcularPaginacion();
                    
                    if (this.turnosPaginados.length === 0 && this.currentPage > 1) {
                      this.currentPage--;
                      this.actualizarPagina();
                    }
          
                    this.cerrarModal();
                    
                    this.alertService.showMessage('Turno eliminado correctamente', 'success');
                  },
                  error: (err) => {
                    console.error('Error al eliminar turno:', err);
                    this.alertService.showMessage('Error al eliminar el turno. Por favor, intenta nuevamente.', 'error');
                  }  
                  });  
        }
      })
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

    imprimirTurnos() {

      const turnosParaImprimir = this.turnosFiltrados.map(t => ({
        fecha: t.fechaTurno,
        nombrePaciente: `${t.paciente?.users.nombre} ${t.paciente?.users.apellido}`,
        dni: t.paciente?.dni,
        email: t.paciente?.users.email,
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

