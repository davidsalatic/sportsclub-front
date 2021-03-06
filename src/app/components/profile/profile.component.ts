import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditPasswordDialogComponent } from '../dialogs/edit-password-dialog/edit-password-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDTO } from 'src/app/models/helpers/register-dto';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  appUser:AppUser;

  constructor(private authService:AuthService,private router:Router,private titleService:TitleService,
    private appUserService:AppUserService,private matDialog:MatDialog,private snackBar:MatSnackBar) { 
      this.titleService.changeTitle("My profile");
    }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    {
      this.authService.extractClaims(this.authService.getToken()).subscribe(claims=>{
        this.loadUserByUsername(claims.sub);
      })
    }
    else
      this.router.navigate(['login']);
  }

  loadUserByUsername(username:string)
  {
    this.appUserService.getByUsername(username).subscribe(user=>{
      this.appUser=user;
    })
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=this.appUser.password;
    let dialogRef = this.matDialog.open(EditPasswordDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(newPassword=>{
      if(newPassword)
      {
        let registerDTO:RegisterDTO = new RegisterDTO();
        registerDTO.password=newPassword;
        registerDTO.token=this.authService.getToken();
        this.authService.register(registerDTO).subscribe(response=>{
          this.showSnackbar("Password changed.");
        })
      }
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
