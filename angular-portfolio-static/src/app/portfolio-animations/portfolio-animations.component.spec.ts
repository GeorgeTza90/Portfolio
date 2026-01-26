import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAnimationsComponent } from './portfolio-animations.component';

describe('PortfolioAnimationsComponent', () => {
  let component: PortfolioAnimationsComponent;
  let fixture: ComponentFixture<PortfolioAnimationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioAnimationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioAnimationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
