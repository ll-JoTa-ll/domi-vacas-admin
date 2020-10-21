import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmStarsComponent } from './dm-stars.component';

describe('DmStarsComponent', () => {
  let component: DmStarsComponent;
  let fixture: ComponentFixture<DmStarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmStarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
