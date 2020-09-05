import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartersDetailComponent } from './charters-detail.component';

describe('ChartersDetailComponent', () => {
  let component: ChartersDetailComponent;
  let fixture: ComponentFixture<ChartersDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartersDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartersDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
