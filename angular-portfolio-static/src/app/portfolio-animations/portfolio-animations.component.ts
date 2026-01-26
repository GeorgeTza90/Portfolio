import { Component } from '@angular/core';

@Component({
  selector: 'app-portfolio-animations',
  standalone: true,
  templateUrl: './portfolio-animations.component.html',
  styleUrls: ['./portfolio-animations.component.css']
})
export class PortfolioAnimationsComponent {
  videoSrc1: string = '/assets/videos/hna-hover.mp4';
  videoSrc2: string = '/assets/videos/bt-hover.mp4';

  onMouseEnter1() {
    this.videoSrc1 = '/assets/videos/hna.mp4';
  }

  onMouseLeave1() {
    this.videoSrc1 = '/assets/videos/hna-hover.mp4';
  }

  onMouseEnter2() {
    this.videoSrc2 = '/assets/videos/bt.mp4';
  }

  onMouseLeave2() {
    this.videoSrc2 = '/assets/videos/bt-hover.mp4';
  }
}
