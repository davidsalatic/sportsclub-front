import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTermFormComponent } from './edit-term-form.component';

describe('EditTermFormComponent', () => {
  let component: EditTermFormComponent;
  let fixture: ComponentFixture<EditTermFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTermFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTermFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
