import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Component, OnInit, Inject} from '@angular/core';

@Component({
  selector: 'app-change-membership-price-dialog',
  templateUrl: './change-membership-price-dialog.component.html',
  styleUrls: ['./change-membership-price-dialog.component.css']
})
export class ChangeMembershipPriceDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ChangeMembershipPriceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private price:number) { 
    }

  ngOnInit(): void {
  }

  getPrice()
  {
    return this.price;
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
