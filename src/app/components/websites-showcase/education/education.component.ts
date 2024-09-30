import { Component, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements AfterViewInit {
  darkMode = false;

  ngAfterViewInit(): void {
    // GSAP animations for page heading and templates
    gsap.from("#education-page h1", {
      duration: 1,
      opacity: 0,
      y: -50,
      ease: "power4.out"
    });

    gsap.from(".template-box", {
      duration: 1,
      opacity: 0,
      scale: 0.8,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;
    const rootElement = document.documentElement;
    if (this.darkMode) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }
}
