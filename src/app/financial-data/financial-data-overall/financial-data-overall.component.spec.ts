import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialDataOverallComponent } from './financial-data-overall.component';

describe('FinancialDataOverallComponent', () => {
  let component: FinancialDataOverallComponent;
  let fixture: ComponentFixture<FinancialDataOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialDataOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialDataOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
