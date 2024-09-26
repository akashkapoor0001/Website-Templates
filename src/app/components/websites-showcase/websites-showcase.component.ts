import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-websites-showcase',
  standalone: true,
  imports: [],
  templateUrl: './websites-showcase.component.html',
  styleUrl: './websites-showcase.component.scss'
})
export class WebsitesShowcaseComponent implements OnInit {
  currentIndex: number = 0;
  items: HTMLElement[] = [];

  ngOnInit(): void {
    console.log('Component initialized'); // Log to confirm the component is loaded
    const carousel = document.getElementById('carousel');
    if (carousel) {
      this.items = Array.from(carousel.children) as HTMLElement[];
      this.updateCarousel();

      document.getElementById('prev')?.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.items.length - 1;
        this.updateCarousel();
      });

      document.getElementById('next')?.addEventListener('click', () => {
        this.currentIndex = (this.currentIndex < this.items.length - 1) ? this.currentIndex + 1 : 0;
        this.updateCarousel();
      });

      setInterval(() => {
        this.currentIndex = (this.currentIndex < this.items.length - 1) ? this.currentIndex + 1 : 0;
        this.updateCarousel();
      }, 2000);
    } else {
      console.error('Carousel not found'); // Log if carousel is not found
    }
  }

  updateCarousel(): void {
    this.items.forEach((item) => {
      item.classList.remove('opacity-100', 'blur-0');
      item.classList.add('opacity-50', 'blur-sm');
    });

    this.items[this.currentIndex].classList.add('opacity-100');
    this.items[this.currentIndex].classList.remove('blur-sm');
    this.items[this.currentIndex].classList.add('blur-0'); // New class to remove blur
  }
}