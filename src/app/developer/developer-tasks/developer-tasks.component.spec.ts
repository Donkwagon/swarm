import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperTasksComponent } from './developer-tasks.component';

describe('DeveloperTasksComponent', () => {
  let component: DeveloperTasksComponent;
  let fixture: ComponentFixture<DeveloperTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
