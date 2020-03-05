import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrainingSessionDialogComponent } from './add-training-session-dialog.component';

describe('AddTrainingSessionDialogComponent', () => {
  let component: AddTrainingSessionDialogComponent;
  let fixture: ComponentFixture<AddTrainingSessionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTrainingSessionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrainingSessionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
