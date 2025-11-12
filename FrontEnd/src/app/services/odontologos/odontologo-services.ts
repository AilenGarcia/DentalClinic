import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Odontologo } from '../models/odontologo';

@Injectable({
  providedIn: 'root'
})
export class OdontologoService {
  
  private apiUrl = 'http://localhost:8080/api/odontologos';
  
  constructor(private http: HttpClient) {}
  
  getOdontologoByUserId(userId: number){
    return this.http.get<Odontologo>(`${this.apiUrl}/findByUser/${userId}`);
  }
  
}
