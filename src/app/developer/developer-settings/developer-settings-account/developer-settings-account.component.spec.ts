import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperSettingsAccountComponent } from './developer-settings-account.component';

describe('DeveloperSettingsAccountComponent', () => {
  let component: DeveloperSettingsAccountComponent;
  let fixture: ComponentFixture<DeveloperSettingsAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperSettingsAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperSettingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
