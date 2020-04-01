import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginDTO } from 'src/app/models/helpers/login-dto';
import { AuthService } from 'src/app/services/auth-service';
import { RegisterDTO } from 'src/app/models/helpers/register-dto';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css']
})
export class EditPasswordDialogComponent implements OnInit {
  
  oldPassword:string

  constructor(private dialogRef: MatDialogRef<EditPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data:string,private snackBar:MatSnackBar,private authService:AuthService) { 
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
    if(newPasswordFromDialog===confirmPasswordFromDialog)
    {
      let loginDTO:LoginDTO = new LoginDTO();
      loginDTO.username = this.authService.getLoggedInUsername();
      loginDTO.password=oldPasswordFromDialog;
      this.authService.login(loginDTO).subscribe(tokenDTO=>{
        if(tokenDTO)
        {
          this.dialogRef.close(newPasswordFromDialog);
        }
        else
          this.showSnackbar("Old password does not match the expected value!");
      })
    }
    else
      this.showSnackbar("Passwords do not match!")
      
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
