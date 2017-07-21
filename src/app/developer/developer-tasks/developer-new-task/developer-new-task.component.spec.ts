import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperNewTaskComponent } from './developer-new-task.component';

describe('DeveloperNewTaskComponent', () => {
  let component: DeveloperNewTaskComponent;
  let fixture: ComponentFixture<DeveloperNewTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperNewTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperNewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
