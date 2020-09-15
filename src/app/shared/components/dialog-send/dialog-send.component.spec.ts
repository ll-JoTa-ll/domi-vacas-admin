import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSendComponent } from './dialog-send.component';

describe('DialogSendComponent', () => {
  let component: DialogSendComponent;
  let fixture: ComponentFixture<DialogSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
