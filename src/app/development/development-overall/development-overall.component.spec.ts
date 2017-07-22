import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentOverallComponent } from './development-overall.component';

describe('DevelopmentOverallComponent', () => {
  let component: DevelopmentOverallComponent;
  let fixture: ComponentFixture<DevelopmentOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopmentOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
