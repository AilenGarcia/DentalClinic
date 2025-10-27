import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.css'
})
export class Carousel {
  currentIndex = 0;

  next() {
    const items = document.querySelectorAll('.carousel-item');
    this.currentIndex = (this.currentIndex + 1) % items.length;
    this.updateSlide();
  }
  
  prev() {
    const items = document.querySelectorAll('.carousel-item');
    this.currentIndex = (this.currentIndex - 1 + items.length) % items.length;
    this.updateSlide();
  }
  
  updateSlide() {
    const carouselInner = document.getElementById('carouselInner');
    carouselInner!.style.transform = `translateX(-${this.currentIndex * 100}%)`;
  }
  
}
