import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { WebsitesShowcaseComponent } from "./components/websites-showcase/websites-showcase.component";
import { IntroComponent } from "./components/intro/intro.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";
import { PaymentGatewayComponent } from './components/payment-gateway/payment-gateway.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule, WebsitesShowcaseComponent, IntroComponent, NavbarComponent, CommonModule, AboutComponent, ContactComponent, PaymentGatewayComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}

