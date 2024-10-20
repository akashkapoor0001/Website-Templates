// import { Component } from '@angular/core';
// import { NavbarComponent } from '../navbar/navbar.component';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { Router } from '@angular/router';
// import { firebaseConfig } from '../../../firebase-config';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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
//   alertMessage: string = '';
//   showAlert: boolean = false;

// onBack() {
// this.router.navigate(['/']);
// }
// rememberMe: any;
// onForgotPassword() {
// throw new Error('Method not implemented.');
// }


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
//         this.showAlertWithMessage('Login successful!');
//         localStorage.setItem('user', JSON.stringify({ email: this.email, firstName: this.email.charAt(0) }));
//         this.showAlert = true; // Show alert
//         setTimeout(() => {
//           this.router.navigate(['/']); // Redirect after 2 seconds
//         }, 2000);
//       })
//       .catch((error) => {
//         console.error('Error during login:', error.message);
//         this.showAlertWithMessage('Error during login: ' + error.message);
//       });
//   }

//   showAlertWithMessage(message: string) {
//     this.alertMessage = message;
//     this.showAlert = true;
//     setTimeout(() => {
//       this.showAlert = false;
//     }, 3000);
//   }

//   // onGoogleLogin() {
//   //   const provider = new GoogleAuthProvider();
//   //   signInWithPopup(this.auth, provider)
//   //     .then((result) => {
//   //       console.log('Google Login successful:', result.user);
//   //       this.showAlertWithMessage('Google Login successful!');
//   //       this.router.navigate(['/']); // Redirect to the homepage after successful login
//   //     })
//   //     .catch((error) => {
//   //       console.error('Error during Google login:', error.message);
//   //       this.showAlertWithMessage('Error during Google login: ' + error.message);
//   //     });
//   // }

//   onGoogleLogin() {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(this.auth, provider)
//       .then((result) => {
//         console.log('Google Login successful:', result.user);
//         this.showAlertWithMessage('Google Login successful!');

//         // Extracting first initial from email
//         const email = result.user.email;
//         const firstName = email ? email.charAt(0).toUpperCase() : '';

//         // Store user email and first initial in localStorage
//         localStorage.setItem('user', JSON.stringify({ email, firstName }));
//         this.router.navigate(['/']); // Redirect to the homepage after successful login
//       })
//       .catch((error) => {
//         console.error('Error during Google login:', error.message);
//         this.showAlertWithMessage('Error during Google login: ' + error.message);
//       });
//   }

//   onRegister(event: Event) {
//     event.preventDefault();
//     createUserWithEmailAndPassword(this.auth, this.email, this.password)
//       .then((userCredential) => {
//         console.log('Registration successful:', userCredential.user);
//         this.showAlertWithMessage('Registration successful!');
//         this.toggleForm(); // Toggle back to the login form after registration
//       })
//       .catch((error) => {
//         console.error('Error during registration:', error.message);
//         this.showAlertWithMessage('Error during registration: ' + error.message);
//       });
//   }

  
// }





// Updated code with email service on logging in

import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { firebaseConfig } from '../../../firebase-config';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import Swal from 'sweetalert2';  // Import SweetAlert
import * as emailjs from 'emailjs-com';  // Import EmailJS

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  // Removed duplicate toggleForm method
confirmPassword: any;
onBack() {
this.router.navigate(['/']);
}

  onForgotPassword() {
    // Show the SweetAlert to get the user's email
    Swal.fire({
      title: 'Reset Password',
      text: 'Please enter your email to reset the password.',
      input: 'email',
      inputPlaceholder: 'Enter your email address',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      cancelButtonText: 'Cancel',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to enter your email address!';
        }
        return null; // Return null if the input is valid
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const email = result.value; // Get the email entered by the user
  
        // Call your Firebase method to send the password reset email
        sendPasswordResetEmail(this.auth, email)
          .then(() => {
            // Show success message
            Swal.fire({
              title: 'Success!',
              text: 'Password reset email has been sent to ' + email,
              icon: 'success',
              confirmButtonText: 'OK'
            });
          })
          .catch((error) => {
            // Show error message if something goes wrong
            Swal.fire({
              title: 'Error!',
              text: 'Failed to send password reset email: ' + error.message,
              icon: 'error',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
  

  email: string = '';
  password: string = '';
  name: string = '';
  isFlipped = false;
  alertMessage: string = '';
  showAlert: boolean = false;

  app = initializeApp(firebaseConfig);
  auth = getAuth();
rememberMe: boolean = false;

ngOnInit(): void {
  // Check if email is saved in localStorage
  const savedEmail = localStorage.getItem('email');
  if (savedEmail) {
    this.email = savedEmail;
    this.rememberMe = true;
  }
}

// Called when user submits login form
login(): void {
  if (this.rememberMe) {
    // Save email in localStorage
    localStorage.setItem('email', this.email);
  } else {
    // Remove email from localStorage if unchecked
    localStorage.removeItem('email');
  }

  // Handle login logic (e.g., authenticate the user)
  console.log('Logging in with email:', this.email);
}

// Called when checkbox is clicked
toggleRememberMe(event: any): void {
  this.rememberMe = event.target.checked;
}

  constructor(private router: Router) {}

  toggleForm() {
    this.isFlipped = !this.isFlipped;
  }

  // Login using email and password
  onLogin() {
    signInWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Login successful:', userCredential.user);
        
        // Show SweetAlert on successful login
        Swal.fire({
          title: 'Login Successful!',
          text: 'You have been logged in successfully.',
          icon: 'success',
          timer: 2000, // Show for 2 seconds
          showConfirmButton: false // Hide OK button
        });
  
        // Save user information in localStorage
        localStorage.setItem('user', JSON.stringify({ email: this.email, firstName: this.email.charAt(0) }));
  
        // Call the email function if email exists
        if (userCredential.user.email) {
          this.sendEmail(userCredential.user.email, 'Login');  
        }
  
        // Navigate to the home page after 2 seconds
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      })
      .catch((error) => {
        console.error('Error during login:', error.message);
  
        // Show SweetAlert for error
        Swal.fire({
          title: 'Login Failed!',
          text: `Error: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });
  }
  

  // Sweet alert
  showAlertWithMessage(message: string) {
    this.alertMessage = message;
    this.showAlert = true;
    setTimeout(() => {
      this.showAlert = false;
    }, 3000);
  }

  // Google Login
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

        // Send success email after login
        if (email) {
          this.sendEmail(email, 'Google Login');
        }

        this.router.navigate(['/']);  // Redirect to homepage after successful login
      })
      .catch((error) => {
        console.error('Error during Google login:', error.message);
        this.showAlertWithMessage('Error during Google login: ' + error.message);
      });
  }
  

  // Register new user
  onRegister(event: Event) {
    event.preventDefault();
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then((userCredential) => {
        console.log('Registration successful:', userCredential.user);
        
        // Show SweetAlert on successful registration
        Swal.fire({
          title: 'Registration Successful!',
          text: 'Your account has been created successfully.',
          icon: 'success',
          timer: 2000, // Show for 2 seconds
          showConfirmButton: false // Hide OK button
        });
  
        // Toggle back to the login form after showing success message
        setTimeout(() => {
          this.toggleForm();  
        }, 2000);
      })
      .catch((error) => {
        console.error('Error during registration:', error.message);
        
        // Show SweetAlert for registration error
        Swal.fire({
          title: 'Registration Failed!',
          text: `Error: ${error.message}`,
          icon: 'error',
          confirmButtonText: 'Try Again'
        });
      });
  }
  

  // Function to send success email using EmailJS
  sendEmail(email: string, loginMethod: string) {
    const templateParams = {
      to_email: email,  // Recipient email
      from_name: 'Kapoor & Sons',
      message: `You have successfully logged in using ${loginMethod} method.`,
      subject: 'Successful Login'
    };

    // EmailJS service: replace with your service ID, template ID, and public key
    emailjs.send('service_qacmovs', 'template_63s6u68', templateParams, '1vDnTB9ivoPRpe_Rg')
      .then((response) => {
        console.log('Email sent successfully:', response.status, response.text);
      }, (error) => {
        console.error('Failed to send email:', error);
      });
  }
}
