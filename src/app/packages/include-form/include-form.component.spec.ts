import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludeFormComponent } from './include-form.component';

describe('IncludeFormComponent', () => {
  let component: IncludeFormComponent;
  let fixture: ComponentFixture<IncludeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
