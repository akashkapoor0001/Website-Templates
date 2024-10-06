// import { Component } from '@angular/core';
// import emailjs from 'emailjs-com';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-contact',
//   standalone: true,
//   imports: [CommonModule, FormsModule],
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.scss']
// })
// export class ContactComponent {
//   firstName: string = '';
//   lastName: string = '';
//   email: string = '';
//   subject: string = ''; // New variable for subject
//   message: string = '';

//   sendEmail() {
//     if (!this.firstName || !this.lastName || !this.email || !this.message) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     const templateParams = {
//       to_name: 'Kapoor & Sons', // Replace with the name you want to use
//       from_name: `${this.firstName} ${this.lastName}`,
//       email: this.email,
//       subject: this.subject, // Include subject in the parameters
//       message: this.message
//     };

//     emailjs.send('service_qacmovs', 'template_q2c7qub', templateParams, '1vDnTB9ivoPRpe_Rg')
//       .then((response) => {
//         console.log('SUCCESS!', response.status, response.text);
//         alert('Your message has been sent successfully!');
//         this.clearForm();
//       }, (err) => {
//         console.log('FAILED...', err);
//         alert('Failed to send your message. Please try again later.');
//       });
//   }

//   clearForm() {
//     this.firstName = '';
//     this.lastName = '';
//     this.email = '';
//     this.subject = ''; // Clear the subject field
//     this.message = '';
//   }
// }




import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';  // Import SweetAlert2

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  subject: string = ''; // Variable for subject
  message: string = '';

  sendEmail() {
    if (!this.firstName || !this.lastName || !this.email || !this.message) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all required fields.',
      });
      return;
    }

    const templateParams = {
      to_name: 'Kapoor & Sons', // Replace with the name you want to use
      from_name: `${this.firstName} ${this.lastName}`,
      email: this.email,
      subject: this.subject, // Include subject in the parameters
      message: this.message
    };

    emailjs.send('service_qacmovs', 'template_q2c7qub', templateParams, '1vDnTB9ivoPRpe_Rg')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully!',
          timer: 3000,
        });
        this.clearForm();
      }, (err) => {
        console.log('FAILED...', err);
        Swal.fire({
          icon: 'error',
          title: 'Error Sending Message',
          text: 'Failed to send your message. Please try again later.',
          timer: 3000,
        });
      });
  }

  clearForm() {
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.subject = ''; // Clear the subject field
    this.message = '';
  }
}

