import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Login } from "./pages/login/login";
import { Signin } from './pages/signin/signin';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, Signin],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('FrontEnd');
}
