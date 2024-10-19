import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  images = [
    'https://www.tradingview.com/x/Ugclh8Zj/',
    'https://www.tradingview.com/x/0Od8uGYJ/',
    'https://www.tradingview.com/x/pxwvCe0j/',
  ];
  currentSlide = 0;
  previousSlide = 0;
  isNext = true;

  nextSlide() {
    this.previousSlide = this.currentSlide;
    this.isNext = true;
    this.currentSlide = (this.currentSlide + 1) % this.images.length;
  }

  prevSlide() {
    this.previousSlide = this.currentSlide;
    this.isNext = false;
    this.currentSlide =
      (this.currentSlide - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number) {
    this.previousSlide = this.currentSlide;
    this.isNext = index > this.currentSlide;
    this.currentSlide = index;
  }
}
