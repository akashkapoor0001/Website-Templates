import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NavbarComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
name: any;
isFlipped = false;
onRegister(event: Event) {
  event.preventDefault(); // Prevent the default form submission behavior
  // You can add any registration logic here if needed.
  // For now, we will just log the registration attempt.
  console.log('Registration attempted for:', this.email, this.password);
  
  // Toggle to show the login form
  this.toggleForm();
}

toggleForm() {
this.isFlipped = !this.isFlipped;
}
email: string ='';
password: string ='';

constructor( private router: Router) {}
onLogin() {

  console.log('Email:', this.email);
  console.log('Password:', this.password);

  this.router.navigate(['/']);
throw new Error('Method not implemented.');
}

}
