import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SitesOverallComponent } from './sites-overall.component';

describe('SitesOverallComponent', () => {
  let component: SitesOverallComponent;
  let fixture: ComponentFixture<SitesOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SitesOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SitesOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
