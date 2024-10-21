// import { Component, OnInit } from '@angular/core';
// import { PhotoService } from './service/photoservice';
// import { GalleriaModule } from 'primeng/galleria';

// @Component({
//     selector: 'app-shop',
//     templateUrl: './shop.component.html',
//     styleUrls: ['./shop.component.scss'],
//     standalone: true,
//     imports: [GalleriaModule],
//     providers: [PhotoService]
// })
// export class ShopComponent implements OnInit {
//     images: any[] | undefined;

//     responsiveOptions: any[] = [
//         {
//             breakpoint: '1024px',
//             numVisible: 5
//         },
//         {
//             breakpoint: '768px',
//             numVisible: 3
//         },
//         {
//             breakpoint: '560px',
//             numVisible: 1
//         }
//     ];

//     constructor(private photoService: PhotoService) {}

//     ngOnInit() {
//         this.photoService.getImages().then((images) => (this.images = images));
//     }
// }






import { Component, OnInit, ViewChild } from '@angular/core';
import { PhotoService } from './service/photoservice';
import { GalleriaModule, Galleria } from 'primeng/galleria';
import gsap from 'gsap'; // Import GSAP for animations

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss'],
    standalone: true,
    imports: [GalleriaModule],
    providers: [PhotoService]
})
export class ShopComponent implements OnInit {
handleItemChange($event: Event) {
throw new Error('Method not implemented.');
}
    @ViewChild('galleria') galleria!: Galleria;

    images: any[] | undefined;
    autoPlay = true; // Initialize autoplay as true

    responsiveOptions: any[] = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];

    constructor(private photoService: PhotoService) {}

    ngOnInit() {
        this.photoService.getImages().then((images) => (this.images = images));
    }

    pauseSlideshow() {
        this.autoPlay = false; // Pause the slideshow by disabling autoPlay
    }

    resumeSlideshow() {
        this.autoPlay = true; // Resume the slideshow by enabling autoPlay
    }

    // GSAP Animation for overlay text (optional)
    animateOverlay(index: number, direction: string) {
        const overlay = document.getElementById(`overlay-${index}`);
        if (!overlay) return;

        if (direction === 'in') {
            gsap.to(overlay, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
        } else if (direction === 'out') {
            gsap.to(overlay, { opacity: 0, y: 50, duration: 0.5, ease: 'power2.in' });
        }
    }
}
