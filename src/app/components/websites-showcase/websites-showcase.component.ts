import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-websites-showcase',
  standalone: true,
  imports: [],
  templateUrl: './websites-showcase.component.html',
  styleUrls: ['./websites-showcase.component.scss'] // Corrected property name to styleUrls
})
export class WebsitesShowcaseComponent implements OnInit {
  ngOnInit(): void {
    console.log('Component initialized'); // Log to confirm the component is loaded
  }
}
