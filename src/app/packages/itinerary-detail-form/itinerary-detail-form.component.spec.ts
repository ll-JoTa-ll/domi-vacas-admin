import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryDetailFormComponent } from './itinerary-detail-form.component';

describe('ItineraryDetailFormComponent', () => {
  let component: ItineraryDetailFormComponent;
  let fixture: ComponentFixture<ItineraryDetailFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItineraryDetailFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItineraryDetailFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
