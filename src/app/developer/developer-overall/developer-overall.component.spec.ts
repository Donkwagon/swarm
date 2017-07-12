import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperOverallComponent } from './developer-overall.component';

describe('DeveloperOverallComponent', () => {
  let component: DeveloperOverallComponent;
  let fixture: ComponentFixture<DeveloperOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
