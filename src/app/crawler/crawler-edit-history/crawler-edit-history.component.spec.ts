import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerEditHistoryComponent } from './crawler-edit-history.component';

describe('CrawlerEditHistoryComponent', () => {
  let component: CrawlerEditHistoryComponent;
  let fixture: ComponentFixture<CrawlerEditHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerEditHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerEditHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
