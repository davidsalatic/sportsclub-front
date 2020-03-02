import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAppUserFormComponent } from './edit-app-user-form.component';

describe('EditAppUserFormComponent', () => {
  let component: EditAppUserFormComponent;
  let fixture: ComponentFixture<EditAppUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAppUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
