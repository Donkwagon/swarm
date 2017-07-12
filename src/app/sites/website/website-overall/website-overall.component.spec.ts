import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteOverallComponent } from './website-overall.component';

describe('WebsiteOverallComponent', () => {
  let component: WebsiteOverallComponent;
  let fixture: ComponentFixture<WebsiteOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
