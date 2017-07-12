import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlerSettingsComponent } from './crawler-settings.component';

describe('CrawlerSettingsComponent', () => {
  let component: CrawlerSettingsComponent;
  let fixture: ComponentFixture<CrawlerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrawlerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrawlerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
