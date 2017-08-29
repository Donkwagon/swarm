import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerCodeComponent } from './crawler-code.component';

describe('CrawlerCodeComponent', () => {
  let component: CrawlerCodeComponent;
  let fixture: ComponentFixture<CrawlerCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
