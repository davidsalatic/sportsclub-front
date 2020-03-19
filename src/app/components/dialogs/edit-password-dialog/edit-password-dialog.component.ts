import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChangeMembershipPriceDialogComponent } from '../change-membership-price-dialog/change-membership-price-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css']
})
export class EditPasswordDialogComponent implements OnInit {
  
  oldPassword:string

  constructor(private dialogRef: MatDialogRef<EditPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:string,private snackBar:MatSnackBar) { 
      this.oldPassword=data;
    }

  ngOnInit(): void {
  }

  close()
  {
    this.dialogRef.close("");
  }

  save(oldPasswordFromDialog:string,newPasswordFromDialog:string,confirmPasswordFromDialog:string)
  {
    if(oldPasswordFromDialog===this.oldPassword)
      {
        if(newPasswordFromDialog===confirmPasswordFromDialog)
          this.dialogRef.close(newPasswordFromDialog);
        else
          this.showSnackbar("Passwords do not match!")
      }
    else
      this.showSnackbar("Old password does not match the expected value!");
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
