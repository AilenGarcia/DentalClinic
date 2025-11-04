import { Routes } from '@angular/router';
import { Turnos } from './pages/turnos/turnos';
import { Odontologos } from './pages/odontologos/odontologos';
import { Signin } from './pages/signin/signin';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { EditPaciente } from './pages/edit-paciente/edit-paciente';
import { EditOdontologo } from './pages/edit-odontologo/edit-odontologo';

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
                component: Turnos,
                title: 'Agendar turno'
            },
            {
                path: 'odontologos',
                component: Odontologos,
                title: 'Listado de odontólogos'
            },
            {
                path: 'edit',
                component: EditPaciente,
                title: 'Modificar perfil'
            },
            {
                path: 'editOdontologo',
                component: EditOdontologo,
                title: 'Modificar perfil'
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
