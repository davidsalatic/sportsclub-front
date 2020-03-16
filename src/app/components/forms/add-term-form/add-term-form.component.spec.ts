import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTermFormComponent } from './add-term-form.component';

describe('AddTermFormComponent', () => {
  let component: AddTermFormComponent;
  let fixture: ComponentFixture<AddTermFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTermFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTermFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
