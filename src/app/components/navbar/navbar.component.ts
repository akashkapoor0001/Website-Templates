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
import Swal from 'sweetalert2';

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
  Swal.fire({
    title: 'Are you sure you want to log out?',
    text: "You will need to log in again to access your account.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms, proceed with logout
      localStorage.removeItem('user'); // Clear user data on logout
      this.emailFirstName = null; // Reset userFirstName
      this.isLoggedIn = false; // Update login status

      // Show the success message with a 2-second timer
      Swal.fire({
        title: 'Logged Out!',
        text: 'You have been logged out successfully.',
        icon: 'success',
        timer: 2000, // Set the timer to 2 seconds (2000 ms)
        showConfirmButton: false // Hide the "OK" button
      }).then(() => {
        // This will be executed after the 2-second timer
        // You can redirect the user or perform another action here if needed
      });
    }
  });
}


}
