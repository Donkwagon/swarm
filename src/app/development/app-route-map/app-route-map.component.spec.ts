import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRouteMapComponent } from './app-route-map.component';

describe('AppRouteMapComponent', () => {
  let component: AppRouteMapComponent;
  let fixture: ComponentFixture<AppRouteMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRouteMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRouteMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
