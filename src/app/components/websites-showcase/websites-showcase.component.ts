import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-websites-showcase',
  standalone: true,
  imports: [],
  templateUrl: './websites-showcase.component.html',
  styleUrls: ['./websites-showcase.component.scss'] // Corrected property name to styleUrls
})
export class WebsitesShowcaseComponent implements OnInit {
  constructor(private router: Router) { }

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
    console.log('Component initialized'); // Log to confirm the component is loaded
  }
}

  function ngOnInit() {
    throw new Error('Function not implemented.');
  }

