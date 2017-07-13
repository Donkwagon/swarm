import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteDataComponent } from './website-data.component';

describe('WebsiteDataComponent', () => {
  let component: WebsiteDataComponent;
  let fixture: ComponentFixture<WebsiteDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
