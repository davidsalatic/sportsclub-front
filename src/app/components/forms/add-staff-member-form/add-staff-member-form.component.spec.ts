import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStaffMemberFormComponent } from './add-staff-member-form.component';

describe('AddStaffMemberFormComponent', () => {
  let component: AddStaffMemberFormComponent;
  let fixture: ComponentFixture<AddStaffMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStaffMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStaffMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
