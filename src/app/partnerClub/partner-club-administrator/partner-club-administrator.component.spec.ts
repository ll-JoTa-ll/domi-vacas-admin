import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerClubAdministratorComponent } from './partner-club-administrator.component';

describe('PartnerClubAdministratorComponent', () => {
  let component: PartnerClubAdministratorComponent;
  let fixture: ComponentFixture<PartnerClubAdministratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerClubAdministratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerClubAdministratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
