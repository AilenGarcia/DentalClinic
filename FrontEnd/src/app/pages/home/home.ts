import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { CarouselHome } from '../../components/carousel-home/carousel-home';

@Component({
  selector: 'app-home',
  imports: [CarouselHome, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
