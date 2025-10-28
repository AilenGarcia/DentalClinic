import { Component } from '@angular/core';
import { Footer } from "../../components/footer/footer";
import { RouterOutlet } from '@angular/router';
import { Header } from "../../components/header/header";

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Footer, Header],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.css'
})
export class MainLayout {

}
