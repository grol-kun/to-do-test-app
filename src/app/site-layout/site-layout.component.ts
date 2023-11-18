import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faXmark, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { HomeComponent } from '../home/home.component';
import { FilterType } from '../shared/models/enums/filter-type.enum';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    FontAwesomeModule,
    HomeComponent,
  ],
})
export class SiteLayoutComponent {
  public collapsed = false;
  public isFiltered = false;

  public faCheck = faCheck;
  public faXmark = faXmark;
  public faArrowLeft = faArrowLeft;
  public faArrowRight = faArrowRight;

  public FilterType = FilterType;

  public filterType: FilterType | null = null;

  @HostListener('document:pointerup', ['$event'])
  public onPointerUp(event: PointerEvent): void {
    if (this.isFiltered && event.button === 0) {
      this.filter(null);
    }
  }

  public toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  public filter(filterType: FilterType | null): void {
    this.isFiltered = !!filterType;
    this.filterType = filterType;
  }
}
