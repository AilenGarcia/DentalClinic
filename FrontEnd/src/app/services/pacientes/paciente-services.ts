import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../models/paciente';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private apiUrl = 'http://localhost:8080/api/pacientes'; // tu backend

  constructor(private http: HttpClient) {}

  getPacienteByUserId(userId: number){
    return this.http.get<Paciente>(`${this.apiUrl}/findByUser/${userId}`);
  }

}
