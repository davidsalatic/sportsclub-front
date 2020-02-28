import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppUserDialogComponent } from './add-app-user-dialog.component';

describe('AddAppUserDialogComponent', () => {
  let component: AddAppUserDialogComponent;
  let fixture: ComponentFixture<AddAppUserDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppUserDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
