import { Paciente } from "./paciente";
import { Odontologo } from "./odontologo";

export interface Turno {
  id?: number;
  fechaTurno: string;    
  paciente?: Paciente;
  odontologo?: Odontologo;
}