import { Paciente } from "./paciente";
import { Odontologo } from "./odontologo";

export interface Turno {
  id?: number,
  fechaTurno: string, // formato ISO (yyyy-mm-dd)
  horaTurno: string,
  paciente: Paciente,
  odontologo: Odontologo,
}
