import { User } from "./user";

export interface Odontologo {
    id?: number,
    matricula: string,
    descripcion: string,
    user: User
}
