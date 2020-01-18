import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogClonePackageComponent } from './dialog-clone-package.component';

describe('DialogClonePackageComponent', () => {
  let component: DialogClonePackageComponent;
  let fixture: ComponentFixture<DialogClonePackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogClonePackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogClonePackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
