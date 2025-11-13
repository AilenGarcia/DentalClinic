import { Component, effect, inject } from '@angular/core';
import { OdontologoService } from '../../services/odontologos/odontologo-services';
import { UserServices } from '../../services/users/user-services';
import { Odontologo } from '../../services/models/odontologo';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-odontologos',
  imports: [],
  templateUrl: './odontologos.html',
  styleUrl: './odontologos.css'
})
export class Odontologos {

  private readonly userService = inject(UserServices);

  odontologos: Odontologo[] = [];
  odontologosPaginados: Odontologo[] = [];
  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 1;

  // Modal properties
    mostrarFicha: boolean = false;
    odontologoSeleccionado: Odontologo | null = null;

  private readonly odontologos$ = this.userService.getAllOdontologos();
  protected readonly signalOdontologos = toSignal(this.odontologos$, { initialValue: null });

  constructor() {
      effect(() => {
        const data = this.signalOdontologos();
        if (data) {
          this.odontologos = data;
          this.calcularPaginacion();
        }
      });
  }

  calcularPaginacion() {
    this.totalPages = Math.ceil(this.odontologos.length / this.pageSize) || 1;
    this.actualizarPagina();
  }

  actualizarPagina() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.odontologosPaginados = this.odontologos.slice(startIndex, endIndex);
  }

  verFichaCompleta(odontologo: Odontologo) {
    this.odontologoSeleccionado = odontologo;
    this.mostrarFicha = true;
  }

  cerrarFicha() {
    this.mostrarFicha = false;
    this.odontologoSeleccionado = null;
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
