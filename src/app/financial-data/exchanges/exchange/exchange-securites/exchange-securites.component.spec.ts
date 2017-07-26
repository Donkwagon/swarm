import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeSecuritesComponent } from './exchange-securites.component';

describe('ExchangeSecuritesComponent', () => {
  let component: ExchangeSecuritesComponent;
  let fixture: ComponentFixture<ExchangeSecuritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeSecuritesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeSecuritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
