import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsitesShowcaseComponent } from "./components/websites-showcase/websites-showcase.component";
import { IntroComponent } from "./components/intro/intro.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AboutComponent } from "./components/about/about.component";
import { ContactComponent } from "./components/contact/contact.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, WebsitesShowcaseComponent, IntroComponent, NavbarComponent, CommonModule, AboutComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}

