import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteUsersComponent } from './website-users.component';

describe('WebsiteUsersComponent', () => {
  let component: WebsiteUsersComponent;
  let fixture: ComponentFixture<WebsiteUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
