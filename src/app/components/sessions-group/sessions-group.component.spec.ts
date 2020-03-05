import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionsGroupComponent } from './sessions-group.component';

describe('SessionsGroupComponent', () => {
  let component: SessionsGroupComponent;
  let fixture: ComponentFixture<SessionsGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionsGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionsGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
