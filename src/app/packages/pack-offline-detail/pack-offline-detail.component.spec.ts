import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackOfflineDetailComponent } from './pack-offline-detail.component';

describe('PackOfflineDetailComponent', () => {
  let component: PackOfflineDetailComponent;
  let fixture: ComponentFixture<PackOfflineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackOfflineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackOfflineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
