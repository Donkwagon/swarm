import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCrawlerComponent } from './new-crawler.component';

describe('NewCrawlerComponent', () => {
  let component: NewCrawlerComponent;
  let fixture: ComponentFixture<NewCrawlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCrawlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
