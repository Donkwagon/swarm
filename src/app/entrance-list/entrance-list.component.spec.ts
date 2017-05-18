import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranceListComponent } from './entrance-list.component';

describe('EntranceListComponent', () => {
  let component: EntranceListComponent;
  let fixture: ComponentFixture<EntranceListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntranceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntranceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
