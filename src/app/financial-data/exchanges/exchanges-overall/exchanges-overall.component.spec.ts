import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangesOverallComponent } from './exchanges-overall.component';

describe('ExchangesOverallComponent', () => {
  let component: ExchangesOverallComponent;
  let fixture: ComponentFixture<ExchangesOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangesOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangesOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
