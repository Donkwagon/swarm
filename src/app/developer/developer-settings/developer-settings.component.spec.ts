import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperSettingsComponent } from './developer-settings.component';

describe('DeveloperSettingsComponent', () => {
  let component: DeveloperSettingsComponent;
  let fixture: ComponentFixture<DeveloperSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
