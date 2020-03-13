import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStaffMemberFormComponent } from './edit-staff-member-form.component';

describe('EditStaffMemberFormComponent', () => {
  let component: EditStaffMemberFormComponent;
  let fixture: ComponentFixture<EditStaffMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditStaffMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditStaffMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
