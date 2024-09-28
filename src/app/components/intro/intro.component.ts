import { AfterViewInit, Component } from '@angular/core';
import { gsap} from 'gsap';
import { WebsitesShowcaseComponent } from '../websites-showcase/websites-showcase.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ShopComponent } from "../shop/shop.component";
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [WebsitesShowcaseComponent, AboutComponent, ContactComponent, NavbarComponent, ShopComponent, FooterComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent implements AfterViewInit{

  ngAfterViewInit(): void {
    gsap.from(".text-left", { duration: 1, x: -100, opacity: 0 });
    gsap.from(".animated-image-container img", { duration: 1, y: 100, opacity: 0, delay: 0.5 });
  }

}
