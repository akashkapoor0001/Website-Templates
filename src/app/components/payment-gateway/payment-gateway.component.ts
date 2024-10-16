// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'; // Import Router for navigation
// import { gsap } from 'gsap';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-payment-gateway',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './payment-gateway.component.html',
//   styleUrls: ['./payment-gateway.component.scss']
// })
// export class PaymentGatewayComponent implements OnInit {
//   paymentSuccess: boolean = false; // Flag to show payment success message
//   countdown: number = 3; // Countdown timer
//   countdownInterval: any; // Interval reference

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     gsap.fromTo('.payment-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5 });
//     gsap.fromTo('.payment-form-container', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });
//   }

//   onSubmit(event: Event): void {
//     event.preventDefault(); // Prevent the default form submission

//     console.log('Payment submitted');

//     // Show success message
//     this.paymentSuccess = true;

//     // Start the countdown
//     this.startCountdown();

//     // Simulate payment processing and delay for 3 seconds
//     setTimeout(() => {
//       this.router.navigate(['/ecommerce']);
//     }, 3000); // Redirect after 3 seconds
//   }

//   startCountdown(): void {
//     this.countdownInterval = setInterval(() => {
//       this.countdown--;

//       if (this.countdown <= 0) {
//         clearInterval(this.countdownInterval);
//       }
//     }, 1000); // Decrease countdown every second
//   }

//   ngOnDestroy(): void {
//     if (this.countdownInterval) {
//       clearInterval(this.countdownInterval);
//     }
//   }
// }




// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router'; // Import Router for navigation
// import { gsap } from 'gsap';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-payment-gateway',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './payment-gateway.component.html',
//   styleUrls: ['./payment-gateway.component.scss']
// })
// export class PaymentGatewayComponent implements OnInit {
//   paymentSuccess: boolean = false; // Flag to show payment success message
//   countdown: number = 3; // Countdown timer
//   countdownInterval: any; // Interval reference
//   showOTPInput: boolean = false; // Flag to show OTP input form
//   mobileNumber: string = ''; // To capture mobile number
//   enteredOTP: string = ''; // To capture entered OTP
//   sentOTP: string = ''; // The OTP sent to the user
//   showOTPError: boolean = false; // Flag to show incorrect OTP error message

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     gsap.fromTo('.payment-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5 });
//     gsap.fromTo('.payment-form-container', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });
//   }

//   onSubmit(event: Event): void {
//     event.preventDefault(); // Prevent default form submission

//     console.log('Payment details submitted');
//     this.sendOTP(); // Simulate sending OTP
//   }

//   sendOTP(): void {
//     // Simulate OTP generation and sending (here, we just generate a random OTP)
//     this.sentOTP = Math.floor(100000 + Math.random() * 900000).toString();
//     console.log(`OTP sent to ${this.mobileNumber}: ${this.sentOTP}`);
//     this.showOTPInput = true; // Show OTP input form
//   }

//   verifyOTP(): void {
//     if (this.enteredOTP === this.sentOTP) {
//       // Correct OTP, proceed to payment success
//       this.paymentSuccess = true;
//       this.showOTPInput = false;
//       this.startCountdown();
//       setTimeout(() => {
//         this.router.navigate(['/ecommerce']);
//       }, 3000); // Redirect after 3 seconds
//     } else {
//       // Wrong OTP, show error
//       this.showOTPError = true;
//       setTimeout(() => {
//         this.showOTPError = false;
//       }, 3000); // Hide error after 3 seconds
//     }
//   }

//   resendOTP(): void {
//     this.sendOTP(); // Resend the OTP
//   }

//   startCountdown(): void {
//     this.countdownInterval = setInterval(() => {
//       this.countdown--;

//       if (this.countdown <= 0) {
//         clearInterval(this.countdownInterval);
//       }
//     }, 1000); // Decrease countdown every second
//   }

//   ngOnDestroy(): void {
//     if (this.countdownInterval) {
//       clearInterval(this.countdownInterval);
//     }
//   }
// }





import { Component, OnInit, OnDestroy } from '@angular/core';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit, OnDestroy {
  paymentSuccess: boolean = false;
  countdown: number = 3;
  countdownInterval: any;
  showOTPInput: boolean = false;
  enteredOTP: string = '';
  showOTPError: boolean = false;

  // Set the URL you want to redirect to after payment is successful
  redirectUrl: string = 'https://websites-template-otp-auth.vercel.app/'; 

  constructor() {}

  ngOnInit(): void {
    gsap.fromTo('.payment-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5 });
    gsap.fromTo('.payment-form-container', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });
  }

  // Handle form submission and redirect to the specified URL
  onSubmit(event: Event): void {
    event.preventDefault();
    
    // Simulate processing payment here
    console.log('Payment details submitted');

    // Redirect after form submission
    this.redirectToUrl();
  }

  redirectToUrl(): void {
    window.location.href = this.redirectUrl; // Redirect to the given URL
  }

  // Start the countdown timer for displaying success message (optional)
  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        // Optionally, redirect to another page or show success message after countdown
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
