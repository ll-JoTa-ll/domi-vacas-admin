import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPassengerInfoComponent } from './dialog-passenger-info.component';

describe('DialogPassengerInfoComponent', () => {
  let component: DialogPassengerInfoComponent;
  let fixture: ComponentFixture<DialogPassengerInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPassengerInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPassengerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
