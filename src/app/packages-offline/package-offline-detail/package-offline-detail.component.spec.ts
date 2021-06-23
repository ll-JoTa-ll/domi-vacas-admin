import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOfflineDetailComponent } from './package-offline-detail.component';

describe('PackageOfflineDetailComponent', () => {
  let component: PackageOfflineDetailComponent;
  let fixture: ComponentFixture<PackageOfflineDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageOfflineDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageOfflineDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
