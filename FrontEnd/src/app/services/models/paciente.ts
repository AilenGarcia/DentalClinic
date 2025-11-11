import { UserResponse } from "./user-response";

export interface Paciente {
    id?: number,
    telefono: string,
    domicilio: string,
    dni: string,
    users: UserResponse
}