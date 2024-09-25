import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitesShowcaseComponent } from './websites-showcase.component';

describe('WebsitesShowcaseComponent', () => {
  let component: WebsitesShowcaseComponent;
  let fixture: ComponentFixture<WebsitesShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsitesShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsitesShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


