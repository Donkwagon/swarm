import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeSecuritiesOverallComponent } from './exchange-securities-overall.component';

describe('ExchangeSecuritiesOverallComponent', () => {
  let component: ExchangeSecuritiesOverallComponent;
  let fixture: ComponentFixture<ExchangeSecuritiesOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeSecuritiesOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeSecuritiesOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
