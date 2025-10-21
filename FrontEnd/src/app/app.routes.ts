import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Turnos } from './turnos/turnos';
import { Register } from './register/register';
import { Login } from './login/login';
import { Odontologos } from './odontologos/odontologos';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        component: Home,
        title: 'Dental Clinic'
    },
    {
        path: 'turnos',
        component: Turnos,
        title: 'Agendar turno'
    },
    {
        path: 'odontologos',
        component: Odontologos,
        title: 'Listado de odontólogos'
    },
    {
        path: 'register',
        component: Register,
        title: 'Registrar nuevo usuario'
    },
    {
        path: 'login',
        component: Login,
        title: 'Iniciar sesión'
    }
];
