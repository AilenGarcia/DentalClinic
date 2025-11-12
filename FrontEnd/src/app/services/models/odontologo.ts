import { UserResponse } from "./user-response";

export interface Odontologo {
    id?: number,
    telefono:string, 
    matricula: string,
    descripcion: string,
    users: UserResponse
}
