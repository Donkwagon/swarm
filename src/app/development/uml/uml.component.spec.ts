import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UMLComponent } from './uml.component';

describe('UMLComponent', () => {
  let component: UMLComponent;
  let fixture: ComponentFixture<UMLComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UMLComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UMLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
