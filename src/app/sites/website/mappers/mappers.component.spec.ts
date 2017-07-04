import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappersComponent } from './mappers.component';

describe('MappersComponent', () => {
  let component: MappersComponent;
  let fixture: ComponentFixture<MappersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
