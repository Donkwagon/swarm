import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperSettingsBasicComponent } from './developer-settings-basic.component';

describe('DeveloperSettingsBasicComponent', () => {
  let component: DeveloperSettingsBasicComponent;
  let fixture: ComponentFixture<DeveloperSettingsBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperSettingsBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperSettingsBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
