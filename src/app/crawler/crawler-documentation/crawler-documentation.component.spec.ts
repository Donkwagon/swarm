import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerDocumentationComponent } from './crawler-documentation.component';

describe('CrawlerDocumentationComponent', () => {
  let component: CrawlerDocumentationComponent;
  let fixture: ComponentFixture<CrawlerDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
