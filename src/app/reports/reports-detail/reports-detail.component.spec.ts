import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDetailComponent } from './reports-detail.component';

describe('ReportsDetailComponent', () => {
  let component: ReportsDetailComponent;
  let fixture: ComponentFixture<ReportsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
