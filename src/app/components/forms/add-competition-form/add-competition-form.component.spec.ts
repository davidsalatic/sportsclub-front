import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetitionFormComponent } from './add-competition-form.component';

describe('AddCompetitionFormComponent', () => {
  let component: AddCompetitionFormComponent;
  let fixture: ComponentFixture<AddCompetitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCompetitionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCompetitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
