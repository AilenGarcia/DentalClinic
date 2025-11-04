import { Odontologo } from "./odontologo";
import { Paciente } from "./paciente";

export interface Turno {
    id?: number;
    fechaTurno: Date;   
    users?: Paciente;           
    odontologo: Odontologo;
  }