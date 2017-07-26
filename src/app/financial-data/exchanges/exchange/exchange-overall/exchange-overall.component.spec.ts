import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeOverallComponent } from './exchange-overall.component';

describe('ExchangeOverallComponent', () => {
  let component: ExchangeOverallComponent;
  let fixture: ComponentFixture<ExchangeOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
