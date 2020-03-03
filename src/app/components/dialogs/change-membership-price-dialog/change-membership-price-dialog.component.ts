import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { isNumber } from 'util';

@Component({
  selector: 'app-change-membership-price-dialog',
  templateUrl: './change-membership-price-dialog.component.html',
  styleUrls: ['./change-membership-price-dialog.component.css']
})
export class ChangeMembershipPriceDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChangeMembershipPriceDialogComponent>) { }

  ngOnInit(): void {
  }

  close()
  {
    this.dialogRef.close("");
  }

  save(price:number)
  {
    if(price)
      this.dialogRef.close(price);
  }

}
