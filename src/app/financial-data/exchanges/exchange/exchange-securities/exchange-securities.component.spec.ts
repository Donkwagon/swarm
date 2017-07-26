import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeSecuritiesComponent } from './exchange-securities.component';

describe('ExchangeSecuritiesComponent', () => {
  let component: ExchangeSecuritiesComponent;
  let fixture: ComponentFixture<ExchangeSecuritiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeSecuritiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeSecuritiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
