import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlersPageComponent } from './crawlers-page.component';

describe('CrawlersPageComponent', () => {
  let component: CrawlersPageComponent;
  let fixture: ComponentFixture<CrawlersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
