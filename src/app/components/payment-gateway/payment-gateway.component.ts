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





// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { gsap } from 'gsap';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import axios from 'axios';

// @Component({
//   selector: 'app-payment-gateway',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './payment-gateway.component.html',
//   styleUrls: ['./payment-gateway.component.scss']
// })
// export class PaymentGatewayComponent implements OnInit {
//   paymentSuccess: boolean = false;
//   countdown: number = 3;
//   countdownInterval: any;
//   showOTPInput: boolean = false;
//   mobileNumber: string = '';
//   enteredOTP: string = '';
//   showOTPError: boolean = false;

//   constructor(private router: Router) {}

//   ngOnInit(): void {
//     gsap.fromTo('.payment-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5 });
//     gsap.fromTo('.payment-form-container', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });
//   }

//   onSubmit(event: Event): void {
//     event.preventDefault();
//     this.sendOTP();
//   }

//   async sendOTP(): Promise<void> {
//     try {
//       const response = await axios.post('http://localhost:5000/api/sendOtp', { mobileNumber: this.mobileNumber });
//       console.log(`OTP sent to ${this.mobileNumber}: Verification SID: ${response.data.sid}`);
//       this.showOTPInput = true;
//     } catch (error) {
//       console.error('Error sending OTP', error);
//       alert('Error sending OTP. Please try again.');
//     }
//   }

//   async verifyOTP(): Promise<void> {
//     try {
//       const response = await axios.post('http://localhost:5000/api/verifyOtp', {
//         mobileNumber: this.mobileNumber,
//         code: this.enteredOTP
//       });

//       if (response.data.valid) {
//         this.paymentSuccess = true;
//         this.showOTPInput = false;
//         this.startCountdown();
//         setTimeout(() => {
//           this.router.navigate(['/ecommerce']);
//         }, 3000);
//       } else {
//         this.showOTPError = true;
//         setTimeout(() => {
//           this.showOTPError = false;
//         }, 3000);
//       }
//     } catch (error) {
//       console.error('Error verifying OTP', error);
//       this.showOTPError = true;
//       setTimeout(() => {
//         this.showOTPError = false;
//       }, 3000);
//     }
//   }

//   resendOTP(): void {
//     this.sendOTP();
//   }

//   startCountdown(): void {
//     this.countdownInterval = setInterval(() => {
//       this.countdown--;
//       if (this.countdown <= 0) {
//         clearInterval(this.countdownInterval);
//       }
//     }, 1000);
//   }

//   ngOnDestroy(): void {
//     if (this.countdownInterval) {
//       clearInterval(this.countdownInterval);
//     }
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

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
  mobileNumber: string = '';
  enteredOTP: string = '';
  showOTPError: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    gsap.fromTo('.payment-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5 });
    gsap.fromTo('.payment-form-container', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent default form submission
    this.sendOTP(); // Trigger OTP sending
  }

  async sendOTP(): Promise<void> {
    try {
      const response = await axios.post('/api/sendOtp', { mobileNumber: this.mobileNumber });
      
      if (response.data.sid) {
        console.log(`OTP sent to ${this.mobileNumber}: Verification SID: ${response.data.sid}`);
        this.showOTPInput = true; // Show OTP input form
      } else {
        console.error('Verification SID is undefined');
        alert('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      alert('Error sending OTP. Please try again.');
    }
  }

  async verifyOTP(): Promise<void> {
    try {
      const response = await axios.post('/api/verifyOtp', {
        mobileNumber: this.mobileNumber,
        code: this.enteredOTP
      });

      if (response.data.valid) {
        this.paymentSuccess = true; // Show payment success
        this.showOTPInput = false; // Hide OTP input
        this.startCountdown(); // Start countdown for redirect
        setTimeout(() => {
          this.router.navigate(['/ecommerce']); // Redirect after 3 seconds
        }, 3000);
      } else {
        this.showOTPError = true; // Show error message for incorrect OTP
        setTimeout(() => {
          this.showOTPError = false; // Hide error after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      this.showOTPError = true; // Show error message
      setTimeout(() => {
        this.showOTPError = false; // Hide error after 3 seconds
      }, 3000);
    }
  }

  resendOTP(): void {
    this.sendOTP(); // Resend the OTP
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval); // Stop countdown when it reaches 0
      }
    }, 1000); // Decrease countdown every second
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval); // Clear interval on component destruction
    }
  }
}
