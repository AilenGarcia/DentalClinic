import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { Hero } from '../../components/hero/hero';

@Component({
  selector: 'app-home',
  imports: [Carousel, Hero],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
