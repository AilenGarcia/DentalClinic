import { UserResponse } from "./user-response";

export interface Odontologo {
    id?: string,
    telefono:string, 
    matricula: string,
    descripcion: string,
    users: UserResponse
}
