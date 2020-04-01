import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginDTO } from 'src/app/models/helpers/login-dto';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-edit-password-dialog',
  templateUrl: './edit-password-dialog.component.html',
  styleUrls: ['./edit-password-dialog.component.css']
})
export class EditPasswordDialogComponent implements OnInit {
  
  constructor(private dialogRef: MatDialogRef<EditPasswordDialogComponent>,
     private snackBar:MatSnackBar,private authService:AuthService) { 
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
          this.dialogRef.close(newPasswordFromDialog);
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
