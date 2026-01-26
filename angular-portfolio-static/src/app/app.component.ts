import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PortfolioPagesComponent } from './portfolio-pages/portfolio-pages.component';
import { PortfolioAnimationsComponent } from './portfolio-animations/portfolio-animations.component';
import { MusicWorkComponent } from './music-work/music-work.component';
import { FooterComponent } from './footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    PortfolioPagesComponent,
    PortfolioAnimationsComponent,
    MusicWorkComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
