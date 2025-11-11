import { Routes } from '@angular/router';
import { Odontologos } from './pages/odontologos/odontologos';
import { Signin } from './pages/signin/signin';
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { MainLayout } from './layouts/main-layout/main-layout';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { EditPaciente } from './pages/edit-paciente/edit-paciente';
import { EditOdontologo } from './pages/edit-odontologo/edit-odontologo';
import { TurnosPaciente } from './pages/turnos/listados/turnos-paciente/turnos-paciente';
import { TurnosOdontologo } from './pages/turnos/listados/turnos-odontologo/turnos-odontologo';
import { publicOnlyGuard } from './core/guards/public-only-guard';
import { authGuard } from './core/guards/auth/auth-guard';
import { FormularioAgendarTurno } from './pages/turnos/new/formulario-agendar-turno/formulario-agendar-turno';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: MainLayout, children: [
            {path: 'home', component: Home, title: 'Dental Clinic'},
            {path: 'turnos', children: [
                    {path: 'pacientes', component: TurnosPaciente,canActivate:[authGuard], title: 'Listado de turnos'},
                    {path: 'odontologos', component: TurnosOdontologo,canActivate:[authGuard], title: 'Listado de turnos'},
                    {path: 'new', component: FormularioAgendarTurno,canActivate:[authGuard], title: 'Listado de turnos'}
                ]
            },
            {path: 'odontologos', component: Odontologos, title: 'Listado de odontólogos', canActivate:[authGuard]},
            {path: 'edit', component: EditPaciente, title: 'Modificar perfil', canActivate:[authGuard]},
            {path: 'editOdontologo', component: EditOdontologo, title: 'Modificar perfil', canActivate:[authGuard]}
        ]
    },
    {
        path: '', component: AuthLayout, children: [
            { path: 'login', component: Login, canActivate:[publicOnlyGuard] },
            { path: 'signIn', component: Signin, canActivate:[publicOnlyGuard] }
        ]
    },
    {path: '**', redirectTo:'home'}

];
