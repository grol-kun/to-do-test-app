import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
  ],
})
export class SiteLayoutComponent implements OnInit {
  public collapsed = false;
  public isFiltered = false;

  public faCheck = faCheck;
  public faXmark = faXmark;
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;

  constructor() {}

  ngOnInit() {
  }

  @HostListener('document:pointerup', ['$event'])
  public onPointerUp(event: PointerEvent) {
    if (this.isFiltered && event.button === 0) {
      this.filter('');
    }
  }

  public toggleSidebar() {
    this.collapsed = !this.collapsed;
  }

  public filter(text: string) {
    this.isFiltered = !!text;
    console.log(`Filter ${text}. Filtered: ${this.isFiltered}`);
  }
}
