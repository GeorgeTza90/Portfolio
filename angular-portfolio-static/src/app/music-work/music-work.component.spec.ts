import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicWorkComponent } from './music-work.component';

describe('MusicWorkComponent', () => {
  let component: MusicWorkComponent;
  let fixture: ComponentFixture<MusicWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicWorkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
