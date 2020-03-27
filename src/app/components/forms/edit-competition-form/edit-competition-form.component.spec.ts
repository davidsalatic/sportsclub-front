import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompetitionFormComponent } from './edit-competition-form.component';

describe('EditCompetitionFormComponent', () => {
  let component: EditCompetitionFormComponent;
  let fixture: ComponentFixture<EditCompetitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCompetitionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompetitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
