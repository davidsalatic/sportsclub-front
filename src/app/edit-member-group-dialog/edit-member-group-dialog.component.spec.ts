import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMemberGroupDialogComponent } from './edit-member-group-dialog.component';

describe('EditMemberGroupDialogComponent', () => {
  let component: EditMemberGroupDialogComponent;
  let fixture: ComponentFixture<EditMemberGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMemberGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMemberGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
