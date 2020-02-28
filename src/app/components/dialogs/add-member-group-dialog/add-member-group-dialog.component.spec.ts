import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMemberGroupDialogComponent } from './add-member-group-dialog.component';

describe('AddMemberGroupDialogComponent', () => {
  let component: AddMemberGroupDialogComponent;
  let fixture: ComponentFixture<AddMemberGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMemberGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMemberGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
