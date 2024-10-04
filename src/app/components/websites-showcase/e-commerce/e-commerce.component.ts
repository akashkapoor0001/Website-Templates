import { Component, AfterViewInit, Renderer2, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { Router, NavigationEnd } from '@angular/router'; // Import Router and NavigationEnd
import { filter } from 'rxjs/operators'; // Import filter

@Component({
  selector: 'app-ecommerce',
  templateUrl: './e-commerce.component.html',
  styleUrls: ['./e-commerce.component.scss']
})
export class ECommerceComponent implements AfterViewInit, OnInit {
  navigateToComponent(arg0: string) {
    // Show any loading message or animation if needed
    console.log('Navigating to payment gateway in 3 seconds...');
    
    // Set a timeout to delay the navigation
    setTimeout(() => {
      this.router.navigate(['/payment-gateway']);
    }, 3000); // Delay of 3000 milliseconds (3 seconds)
  }
  
  darkMode = false;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit(): void {
    // Check if user already has a preferred theme from localStorage
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      this.darkMode = true;
      this.renderer.addClass(document.body, 'dark'); // Apply dark theme to the body
    }

    // Scroll to top when the component is loaded
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo(0, 0); // Scroll to the top of the page on navigation
      });
  }

  ngAfterViewInit(): void {
    // GSAP animations for titles and boxes
    gsap.from("#ecommerce-page h1", {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power4.out"
    });

    gsap.from(".template-box", {
      duration: 1,
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });
  }

  toggleTheme(): void {
    // Toggle dark mode and update styles for the full component
    this.darkMode = !this.darkMode;

    if (this.darkMode) {
      this.renderer.addClass(document.body, 'dark'); // Toggle dark theme for body
      localStorage.setItem('theme', 'dark');  // Save theme preference
    } else {
      this.renderer.removeClass(document.body, 'dark'); // Remove dark theme for body
      localStorage.setItem('theme', 'light');  // Save theme preference
    }
  }
}
