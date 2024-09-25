import { AfterViewInit, Component } from '@angular/core';
import { gsap} from 'gsap';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    gsap.from(".text-left", { duration: 1, x: -100, opacity: 0 });
    gsap.from(".animated-image-container img", { duration: 1, y: 100, opacity: 0, delay: 0.5 });
  }

}
