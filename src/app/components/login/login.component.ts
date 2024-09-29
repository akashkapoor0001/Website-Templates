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
  alertMessage: string = '';
  showAlert: boolean = false;

onBack() {
this.router.navigate(['/']);
}
rememberMe: any;
onForgotPassword() {
throw new Error('Method not implemented.');
}


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
        this.showAlertWithMessage('Login successful!');
        localStorage.setItem('user', JSON.stringify({ email: this.email, firstName: this.email.charAt(0) }));
        this.showAlert = true; // Show alert
        setTimeout(() => {
          this.router.navigate(['/']); // Redirect after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        console.error('Error during login:', error.message);
        this.showAlertWithMessage('Error during login: ' + error.message);
      });
  }

  showAlertWithMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  // onGoogleLogin() {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(this.auth, provider)
  //     .then((result) => {
  //       console.log('Google Login successful:', result.user);
  //       this.showAlertWithMessage('Google Login successful!');
  //       this.router.navigate(['/']); // Redirect to the homepage after successful login
  //     })
  //     .catch((error) => {
  //       console.error('Error during Google login:', error.message);
  //       this.showAlertWithMessage('Error during Google login: ' + error.message);
  //     });
  // }

  onGoogleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('Google Login successful:', result.user);
        this.showAlertWithMessage('Google Login successful!');

        // Extracting first initial from email
        const email = result.user.email;
        const firstName = email ? email.charAt(0).toUpperCase() : '';

        // Store user email and first initial in localStorage
        localStorage.setItem('user', JSON.stringify({ email, firstName }));
        this.router.navigate(['/']); // Redirect to the homepage after successful login
      })
      .catch((error) => {
        console.error('Error during Google login:', error.message);
        this.showAlertWithMessage('Error during Google login: ' + error.message);
      });
  }

  onRegister(event: Event) {
    event.preventDefault();
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Registration successful:', userCredential.user);
        this.showAlertWithMessage('Registration successful!');
        this.toggleForm(); // Toggle back to the login form after registration
      })
      .catch((error) => {
        console.error('Error during registration:', error.message);
        this.showAlertWithMessage('Error during registration: ' + error.message);
      });
  }

  
}