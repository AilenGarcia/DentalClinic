import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Turnos } from './pages/turnos/turnos';
import { Odontologos } from './pages/odontologos/odontologos';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';

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
