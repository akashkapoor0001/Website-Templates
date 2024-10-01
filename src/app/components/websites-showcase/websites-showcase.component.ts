// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-websites-showcase',
//   standalone: true,
//   imports: [],
//   templateUrl: './websites-showcase.component.html',
//   styleUrls: ['./websites-showcase.component.scss'] // Corrected property name to styleUrls
// })
// export class WebsitesShowcaseComponent implements OnInit {
//   constructor(private router: Router) { }

//   navigateToComponent(template: string) {
//     switch (template) {
//       case 'ecommerce':
//         this.router.navigate(['/ecommerce']);
//         break;
//       case 'education':
//         this.router.navigate(['/education']);
//         break;
//       case 'business':
//         this.router.navigate(['/business']);
//         break;
//       case 'health':
//         this.router.navigate(['/health']);
//         break;
//       case 'landing-page':
//         this.router.navigate(['/landing-page']);
//         break;
//       case 'blog':
//         this.router.navigate(['/blog']);
//         break;
//       case 'real-estate':
//         this.router.navigate(['/real-estate']);
//         break;
//       case 'travel':
//         this.router.navigate(['/travel']);
//         break;
//       case 'portfolio':
//         this.router.navigate(['/portfolio']);
//         break;
//       default:
//         break;
//   }
// }
// ngOnInit(): void {
//     console.log('Component initialized'); // Log to confirm the component is loaded
//   }
// }

//   function ngOnInit() {
//     throw new Error('Function not implemented.');
//   }










import { Component, OnInit, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-websites-showcase',
  standalone: true,
  imports: [],
  templateUrl: './websites-showcase.component.html',
  styleUrls: ['./websites-showcase.component.scss']
})
export class WebsitesShowcaseComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private el: ElementRef, private renderer: Renderer2) {}

  // Use AfterViewInit to make sure the DOM is loaded
  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  // Setup the IntersectionObserver
  setupIntersectionObserver(): void {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.1 // 10% of the box is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // When element is in view, add 'animate' class
          this.renderer.addClass(entry.target, 'animate');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, options);

    // Target all the elements with the class 'observe-box'
    const boxes = this.el.nativeElement.querySelectorAll('.observe-box');
    boxes.forEach((box: Element) => {
      observer.observe(box); // Start observing each box
    });
  }

  navigateToComponent(template: string) {
    switch (template) {
      case 'ecommerce':
        this.router.navigate(['/ecommerce']);
        break;
      case 'education':
        this.router.navigate(['/education']);
        break;
      case 'business':
        this.router.navigate(['/business']);
        break;
      case 'health':
        this.router.navigate(['/health']);
        break;
      case 'landing-page':
        this.router.navigate(['/landing-page']);
        break;
      case 'blog':
        this.router.navigate(['/blog']);
        break;
      case 'real-estate':
        this.router.navigate(['/real-estate']);
        break;
      case 'travel':
        this.router.navigate(['/travel']);
        break;
      case 'portfolio':
        this.router.navigate(['/portfolio']);
        break;
      default:
        break;
    }
  }

  ngOnInit(): void {
    console.log('Component initialized');
  }
}
