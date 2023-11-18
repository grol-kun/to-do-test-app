import { TestBed } from '@angular/core/testing';
import { SiteLayoutComponent } from './site-layout.component';
import { FilterType } from '../shared/models/enums/filter-type.enum';

describe('SiteLayoutComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteLayoutComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SiteLayoutComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar', () => {
    const fixture = TestBed.createComponent(SiteLayoutComponent);
    const component = fixture.componentInstance;

    const initialCollapsedState = component.collapsed;
    component.toggleSidebar();
    expect(component.collapsed).toEqual(!initialCollapsedState);
  });

  it('should filter with null', () => {
    const fixture = TestBed.createComponent(SiteLayoutComponent);
    const component = fixture.componentInstance;

    component.filter(FilterType.EXPIRED);
    expect(component.isFiltered).toBeTruthy();
    expect(component.filterType).toEqual(FilterType.EXPIRED);

    component.filter(null);
    expect(component.isFiltered).toBeFalsy();
    expect(component.filterType).toBeNull();
  });

  it('should reset filter on document pointerup event', () => {
    const fixture = TestBed.createComponent(SiteLayoutComponent);
    const component = fixture.componentInstance;

    component.isFiltered = true;
    component.filterType = FilterType.DONE;

    const event = new PointerEvent('pointerup', { button: 0 });
    document.dispatchEvent(event);

    expect(component.isFiltered).toBeFalsy();
    expect(component.filterType).toBeNull();
  });

  it('should initialize with default values', () => {
    const fixture = TestBed.createComponent(SiteLayoutComponent);
    const component = fixture.componentInstance;

    expect(component.collapsed).toBeFalsy();
    expect(component.isFiltered).toBeFalsy();
    expect(component.filterType).toBeNull();
  });

  it('should toggle sidebar and change filter on toggleSidebar', () => {
    const fixture = TestBed.createComponent(SiteLayoutComponent);
    const component = fixture.componentInstance;

    component.toggleSidebar();
    expect(component.collapsed).toBeTruthy();

    component.toggleSidebar();
    expect(component.collapsed).toBeFalsy();

    component.filter(FilterType.EXPIRED);
    component.toggleSidebar();
    expect(component.collapsed).toBeTruthy();
    expect(component.isFiltered).toBeTruthy();
    expect(component.filterType).toEqual(FilterType.EXPIRED);
  });

  it('should not reset filter on document pointerup event if right-clicked', () => {
    const fixture = TestBed.createComponent(SiteLayoutComponent);
    const component = fixture.componentInstance;

    component.isFiltered = true;
    component.filterType = FilterType.EXPIRED;

    const rightClickEvent = new PointerEvent('pointerup', { button: 2 });
    document.dispatchEvent(rightClickEvent);

    expect(component.isFiltered).toBeTruthy();
    expect(component.filterType).toEqual(FilterType.EXPIRED);

    const leftClickEvent = new PointerEvent('pointerup', { button: 0 });
    document.dispatchEvent(leftClickEvent);

    expect(component.isFiltered).toBeFalse();
    expect(component.filterType).toBeNull();
  });
});
