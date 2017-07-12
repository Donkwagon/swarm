import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlersOverallComponent } from './crawlers-overall.component';

describe('CrawlersOverallComponent', () => {
  let component: CrawlersOverallComponent;
  let fixture: ComponentFixture<CrawlersOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlersOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlersOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
