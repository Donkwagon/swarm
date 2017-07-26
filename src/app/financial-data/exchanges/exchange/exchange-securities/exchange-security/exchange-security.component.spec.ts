import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeSecurityComponent } from './exchange-security.component';

describe('ExchangeSecurityComponent', () => {
  let component: ExchangeSecurityComponent;
  let fixture: ComponentFixture<ExchangeSecurityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExchangeSecurityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
