import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { CarouselHome } from '../../components/carousel-home/carousel-home';
import { FooterHome } from "../../components/footer-home/footer-home";

@Component({
  selector: 'app-home',
  imports: [CarouselHome, Hero, FooterHome],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
