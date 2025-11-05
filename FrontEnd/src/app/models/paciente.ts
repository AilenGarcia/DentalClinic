import { User } from "./user"

export interface Paciente {
    id?: number,
    telefono: string,
    domicilio: string,
    dni: string,
    fechaDeAlta: string,
    user: User
}