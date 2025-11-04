import { Routes } from '@angular/router';
import { Odontologos } from './pages/odontologos/odontologos';
import { Signin } from './pages/signin/signin';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { TurnosPaciente } from './pages/turnos/listados/turnos-paciente/turnos-paciente';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: MainLayout, children: [
            {
                path: 'home',
                component: Home,
                title: 'Dental Clinic'
            },
            {
                path: 'turnos',
                component: TurnosPaciente,
                title: 'Listado de turnos'
            },
            {
                path: 'odontologos',
                component: Odontologos,
                title: 'Listado de odontólogos'
            }
        ]
    },
    {
        path: '', component: AuthLayout, children: [
            { path: 'login', component: Login },
            { path: 'signIn', component: Signin }
        ]
    }

];
