// import { Component } from '@angular/core';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { firebaseConfig } from '../../../firebase-config';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [NavbarComponent, FormsModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   email: string = '';
//   password: string = '';
//   name: string = '';
//   isFlipped = false;

//   app = initializeApp(firebaseConfig);
//   auth = getAuth();

//   constructor(private router: Router) {}

//   toggleForm() {
//     this.isFlipped = !this.isFlipped;
//   }

//   onLogin() {
//     signInWithEmailAndPassword(this.auth, this.email, this.password)
//       .then((userCredential) => {
//         console.log('Login successful:', userCredential.user);
//         this.router.navigate(['/']); // Redirect to the homepage upon successful login
//       })
//       .catch((error) => {
//         console.error('Error during login:', error.message);
//       });
//   }

//     // Handle Registration
//     onRegister(event: Event) {
//       event.preventDefault();
//       createUserWithEmailAndPassword(this.auth, this.email, this.password)
//         .then((userCredential) => {
//           console.log('Registration successful:', userCredential.user);
//           this.toggleForm(); // Toggle back to the login form after registration
//         })
//         .catch((error) => {
//           console.error('Error during registration:', error.message);
//         });

//         this.toggleForm();
//     }
// }















import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firebaseConfig } from '../../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  isFlipped = false;

  app = initializeApp(firebaseConfig);
  auth = getAuth();

  constructor(private router: Router) {}

  toggleForm() {
    this.isFlipped = !this.isFlipped;
  }

  onLogin() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential.user);
        this.router.navigate(['/']); // Redirect to the homepage upon successful login
      })
      .catch((error) => {
        console.error('Error during login:', error.message);
      });
  }

  // Google Sign-In Method
  onGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('Google Login successful:', result.user);
        this.router.navigate(['/']); // Redirect to the homepage after successful login
      })
      .catch((error) => {
        console.error('Error during Google login:', error.message);
      });
  }

  onRegister(event: Event) {
    event.preventDefault();
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Registration successful:', userCredential.user);
        this.toggleForm(); // Toggle back to the login form after registration
      })
      .catch((error) => {
        console.error('Error during registration:', error.message);
      });

      this.toggleForm();
  }
}
