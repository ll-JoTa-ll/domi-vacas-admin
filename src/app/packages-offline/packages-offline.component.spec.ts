import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesOfflineComponent } from './packages-offline.component';

describe('PackagesOfflineComponent', () => {
  let component: PackagesOfflineComponent;
  let fixture: ComponentFixture<PackagesOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
