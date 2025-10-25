import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Signin } from './pages/signin/signin';

export const routes: Routes = [
    {path: 'login',  component: Login},
    {path:'signIn', component: Signin}
];
