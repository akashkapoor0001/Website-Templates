import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router for navigation
import { gsap } from 'gsap';
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

  constructor(private router: Router) {}

  ngOnInit(): void {
    gsap.fromTo('.payment-info', { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 1.5 });
    gsap.fromTo('.payment-form-container', { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 1.5 });
  }

  onSubmit(event: Event): void {
    event.preventDefault(); // Prevent the default form submission

    console.log('Payment submitted');

    // Show success message
    this.paymentSuccess = true;

    // Start the countdown
    this.startCountdown();

    // Simulate payment processing and delay for 3 seconds
    setTimeout(() => {
      this.router.navigate(['/ecommerce']);
    }, 3000); // Redirect after 3 seconds
  }

  startCountdown(): void {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
      }
    }, 1000); // Decrease countdown every second
  }

  ngOnDestroy(): void {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }
}
