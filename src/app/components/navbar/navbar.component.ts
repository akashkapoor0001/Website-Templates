// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterModule } from '@angular/router';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [CommonModule,RouterModule],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.scss'
// })
// export class NavbarComponent {
//   isMenuOpen = false;
//   activeLink = '#home'; // Default active link

//   toggleMenu() {
//     this.isMenuOpen = !this.isMenuOpen;
//   }

//   closeMenu() {
//     this.isMenuOpen = false;
//   }

//   setActiveLink(link: string) {
//     this.activeLink = link;
//   }
// }





import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isMenuOpen = false;
  activeLink = '#home'; // Default active link
  emailFirstName: string | null = null; // Store the user's first name
  isLoggedIn: boolean = false; // Track login status

  constructor() {
    this.checkLoginStatus();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }

checkLoginStatus() {
  // Check localStorage for user data
  const userData = localStorage.getItem('user');
  if (userData) {
    const user = JSON.parse(userData);
    this.emailFirstName = user.firstName; // Set first letter from user data
    this.isLoggedIn = true; // User is logged in
  }
}

  logout() {
    localStorage.removeItem('user'); // Clear user data on logout
    this.emailFirstName = null; // Reset userFirstName
    this.isLoggedIn = false; // Update login status
  }
}
