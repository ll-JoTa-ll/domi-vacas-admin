import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoPassComponent } from './dialog-info-pass.component';

describe('DialogInfoPassComponent', () => {
  let component: DialogInfoPassComponent;
  let fixture: ComponentFixture<DialogInfoPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogInfoPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogInfoPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
