import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperInboxComponent } from './developer-inbox.component';

describe('DeveloperInboxComponent', () => {
  let component: DeveloperInboxComponent;
  let fixture: ComponentFixture<DeveloperInboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperInboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperInboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
