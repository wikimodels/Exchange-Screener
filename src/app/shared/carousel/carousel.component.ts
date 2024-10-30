import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent {
  @Input() images: string[] | undefined = []; // Default to an empty array if undefined
  currentSlide = 0;
  previousSlide = 0;
  isNext = true;

  nextSlide() {
    if (this.images && this.images.length > 0) {
      this.previousSlide = this.currentSlide;
      this.isNext = true;
      this.currentSlide = (this.currentSlide + 1) % this.images.length;
    }
  }

  prevSlide() {
    if (this.images && this.images.length > 0) {
      this.previousSlide = this.currentSlide;
      this.isNext = false;
      this.currentSlide =
        (this.currentSlide - 1 + this.images.length) % this.images.length;
    }
  }

  goToSlide(index: number) {
    if (this.images && this.images.length > 0) {
      this.previousSlide = this.currentSlide;
      this.isNext = index > this.currentSlide;
      this.currentSlide = index;
    }
  }
}
