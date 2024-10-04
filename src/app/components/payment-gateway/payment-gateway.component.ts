import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { gsap } from 'gsap';
// import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-gateway',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  paymentSuccess: boolean = false; // Flag to show payment success message
  countdown: number = 3; // Countdown timer
  countdownInterval: any; // Interval reference

  constructor(private router: Router) {} // Inject Router

  ngOnInit(): void {
    // Animation on component load
    gsap.fromTo(
      '.payment-container',
      { opacity: 0, scale: 0.8 },
      { duration: 1, opacity: 1, scale: 1, ease: 'back.out(1.7)' }
    );
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent the default form submission

    // Simulate payment processing
    console.log('Payment submitted');

    // Show success message
    this.paymentSuccess = true;

    // Start the countdown
    this.startCountdown();

    // Simulate a delay for processing payment (e.g., 2 seconds)
    setTimeout(() => {
      // After processing payment, redirect to the main page
      this.router.navigate(['/ecommerce']); // Adjust path as necessary
    }, 3000); // Total time for alert message (3 seconds)
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      // Clear interval when countdown reaches zero
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000); // Decrease countdown every second
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed to avoid memory leaks
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
