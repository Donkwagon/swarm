import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDataMaintenanceComponent } from './financial-data-maintenance.component';

describe('FinancialDataMaintenanceComponent', () => {
  let component: FinancialDataMaintenanceComponent;
  let fixture: ComponentFixture<FinancialDataMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialDataMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDataMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
