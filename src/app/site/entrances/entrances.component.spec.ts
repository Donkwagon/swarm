import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrancesComponent } from './entrances.component';

describe('EntrancesComponent', () => {
  let component: EntrancesComponent;
  let fixture: ComponentFixture<EntrancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntrancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
