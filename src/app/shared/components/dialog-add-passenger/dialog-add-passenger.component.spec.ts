import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddPassengerComponent } from './dialog-add-passenger.component';

describe('DialogAddPassengerComponent', () => {
  let component: DialogAddPassengerComponent;
  let fixture: ComponentFixture<DialogAddPassengerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddPassengerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
