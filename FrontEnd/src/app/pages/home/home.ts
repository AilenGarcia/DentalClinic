import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { CarouselHome } from '../../components/carousel-home/carousel-home';
import { Ubicacion } from "../../components/ubicacion/ubicacion";

@Component({
  selector: 'app-home',
  imports: [CarouselHome, Hero, Ubicacion],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
