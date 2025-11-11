import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroments/enviroments';
import { Observable } from 'rxjs';
import { Turno } from '../models/turnos';


@Injectable({
  providedIn: 'root'
})
export class TurnoServices {
  private readonly client = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/turnos`;

  listar(): Observable<Turno[]> {
    return this.client.get<Turno[]>(`${this.API_URL}/list`);
  }

  buscar(id: number): Observable<Turno> {
    return this.client.get<Turno>(`${this.API_URL}/find/${id}`);
  }

  agregar(turno: Turno): Observable<{ message: string }> {
    return this.client.post<{ message: string }>(`${this.API_URL}/add`, turno);
  }

  eliminar(id: number): Observable<{ message: string }> {
    return this.client.delete<{ message: string }>(`${this.API_URL}/delete/${id}`);
  }

  buscarPorOdontologo(id: number): Observable<Turno[]> {
    return this.client.get<Turno[]>(`${this.API_URL}/findByOd/${id}`);
  }

  buscarPorPaciente(id: number): Observable<Turno[]> {
    return this.client.get<Turno[]>(`${this.API_URL}/findByPa/${id}`);
  }
}

