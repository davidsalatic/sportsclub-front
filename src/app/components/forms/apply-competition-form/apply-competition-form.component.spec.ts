import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCompetitionFormComponent } from './apply-competition-form.component';

describe('ApplyCompetitionFormComponent', () => {
  let component: ApplyCompetitionFormComponent;
  let fixture: ComponentFixture<ApplyCompetitionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCompetitionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCompetitionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
