import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartersListComponent } from './charters-list.component';

describe('ChartersListComponent', () => {
  let component: ChartersListComponent;
  let fixture: ComponentFixture<ChartersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
