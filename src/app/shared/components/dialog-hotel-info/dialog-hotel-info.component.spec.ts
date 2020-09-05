import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHotelInfoComponent } from './dialog-hotel-info.component';

describe('DialogHotelInfoComponent', () => {
  let component: DialogHotelInfoComponent;
  let fixture: ComponentFixture<DialogHotelInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogHotelInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogHotelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
