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

  redirectUrl: string = 'https://websites-template-otp-auth.vercel.app/';

  constructor() {}

  ngOnInit(): void {
    gsap.fromTo('.payment-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5 });
    gsap.fromTo('.payment-form-container', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });
  
    const cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
    const cvvInput = document.getElementById('cvv') as HTMLInputElement;
    const expiryDateInput = document.getElementById('expiryDate') as HTMLInputElement;
  
    cardNumberInput?.addEventListener('input', this.formatCardNumber);
    cardNumberInput?.addEventListener('keydown', this.allowOnlyNumbers);
    cvvInput?.addEventListener('keydown', this.allowOnlyNumbers);
  
    expiryDateInput?.addEventListener('keydown', this.allowOnlyNumbers);
    expiryDateInput?.addEventListener('input', this.validateExpiryDate); // Attach expiry date validation
  
    const cardNameInput = document.getElementById('cardName') as HTMLInputElement;
    cardNameInput?.addEventListener('keydown', this.allowOnlyText);
  }
  

  // Format card number into 4 pairs of 4 digits
  formatCardNumber(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\s+/g, ''); // Remove existing spaces
    if (value.length > 16) {
      value = value.slice(0, 16); // Limit to 16 digits
    }
    // Add space every 4 digits
    input.value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  // Allow only numeric input
  allowOnlyNumbers(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  }

  // Validate expiry date format MM/YY
validateExpiryDate(event: Event): void {
  const input = event.target as HTMLInputElement;
  const value = input.value;

  // Automatically add "/" after entering 2 digits for the month
  if (value.length === 2 && !value.includes('/')) {
    input.value = `${value}/`;
  }

  // Validate expiry date format
  const expiryPattern = /^(0[1-9]|1[0-2])\/\d{2}$/; // Matches MM/YY format
  if (value.length === 5 && !expiryPattern.test(value)) {
    input.setCustomValidity('Invalid expiry date format. Please enter MM/YY.');
  } else {
    input.setCustomValidity('');
  }
}

  // Allow only text (letters and spaces) in Cardholder Name
  allowOnlyText(event: KeyboardEvent): void {
    const key = event.key;
    if (!/^[a-zA-Z\s]$/.test(key) && key !== 'Backspace' && key !== 'Tab') {
      event.preventDefault();
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log('Payment details submitted');
    this.redirectToUrl();
  }

  redirectToUrl(): void {
    window.location.href = this.redirectUrl;
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
