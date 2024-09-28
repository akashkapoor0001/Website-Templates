import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'] // Fixed to `styleUrls`
})
export class ShopComponent implements OnInit {
  currentIndex = 0;
  items = [
    { imageSrc: 'assets/logo.png', altText: 'Template 1' },
    { imageSrc: 'assets/logo1.png', altText: 'Template 2' },
    { imageSrc: 'assets/ExpenseTracker.png', altText: 'Template 3' }
  ];

  ngOnInit() {
    const carouselItems = document.querySelectorAll('.carousel-item'); // Select the items
    this.setActiveItem(carouselItems);
    setInterval(() => {
      this.moveToNextItem(carouselItems);
    }, 3000); // Change item every 3 seconds
  }
  
  moveToNextItem(carouselItems: NodeListOf<Element>) {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    this.setActiveItem(carouselItems);
  }
  
  setActiveItem(carouselItems: NodeListOf<Element>) {
    carouselItems.forEach((item, index) => {
      if (index === this.currentIndex) {
        item.classList.add('active'); // Add 'active' class to center item
      } else {
        item.classList.remove('active'); // Remove 'active' class from others
      }
    });
  }
}
