import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerOverallComponent } from './crawler-overall.component';

describe('CrawlerOverallComponent', () => {
  let component: CrawlerOverallComponent;
  let fixture: ComponentFixture<CrawlerOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
