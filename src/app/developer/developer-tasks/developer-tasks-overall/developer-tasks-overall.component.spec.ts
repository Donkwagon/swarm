import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperTasksOverallComponent } from './developer-tasks-overall.component';

describe('DeveloperTasksOverallComponent', () => {
  let component: DeveloperTasksOverallComponent;
  let fixture: ComponentFixture<DeveloperTasksOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperTasksOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperTasksOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
