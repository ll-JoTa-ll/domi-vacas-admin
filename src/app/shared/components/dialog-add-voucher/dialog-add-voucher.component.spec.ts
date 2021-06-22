import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddVoucherComponent } from './dialog-add-voucher.component';

describe('DialogAddVoucherComponent', () => {
  let component: DialogAddVoucherComponent;
  let fixture: ComponentFixture<DialogAddVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
