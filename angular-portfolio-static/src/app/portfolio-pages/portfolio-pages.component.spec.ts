import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPagesComponent } from './portfolio-pages.component';

describe('PortfolioPagesComponent', () => {
  let component: PortfolioPagesComponent;
  let fixture: ComponentFixture<PortfolioPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioPagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
