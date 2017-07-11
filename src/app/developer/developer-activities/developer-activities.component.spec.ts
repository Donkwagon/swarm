import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperActivitiesComponent } from './developer-activities.component';

describe('DeveloperActivitiesComponent', () => {
  let component: DeveloperActivitiesComponent;
  let fixture: ComponentFixture<DeveloperActivitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperActivitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
