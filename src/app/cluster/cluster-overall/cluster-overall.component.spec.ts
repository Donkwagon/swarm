import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusterOverallComponent } from './cluster-overall.component';

describe('ClusterOverallComponent', () => {
  let component: ClusterOverallComponent;
  let fixture: ComponentFixture<ClusterOverallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClusterOverallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClusterOverallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
