import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMembershipPriceDialogComponent } from './change-membership-price-dialog.component';

describe('ChangeMembershipPriceDialogComponent', () => {
  let component: ChangeMembershipPriceDialogComponent;
  let fixture: ComponentFixture<ChangeMembershipPriceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMembershipPriceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMembershipPriceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
