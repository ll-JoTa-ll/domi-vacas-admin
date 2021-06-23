import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageOfflineListComponent } from './package-offline-list.component';

describe('PackageOfflineListComponent', () => {
  let component: PackageOfflineListComponent;
  let fixture: ComponentFixture<PackageOfflineListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageOfflineListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageOfflineListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
