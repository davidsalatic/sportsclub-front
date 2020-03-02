import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppUserFormComponent } from './add-app-user-form.component';

describe('AddAppUserFormComponent', () => {
  let component: AddAppUserFormComponent;
  let fixture: ComponentFixture<AddAppUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAppUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
