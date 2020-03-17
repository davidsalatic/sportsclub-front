import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGenerateSessionsDialogComponent } from './auto-generate-sessions-dialog.component';

describe('AutoGenerateSessionsDialogComponent', () => {
  let component: AutoGenerateSessionsDialogComponent;
  let fixture: ComponentFixture<AutoGenerateSessionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoGenerateSessionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoGenerateSessionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
