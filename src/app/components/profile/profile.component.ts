import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { EditPasswordDialogComponent } from '../dialogs/edit-password-dialog/edit-password-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  appUser:AppUser;

  constructor(private authService:AuthService,private router:Router,
    private appUserService:AppUserService,private matDialog:MatDialog,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims)
        {
          this.loadUserByUsername(claims.sub);
        }
        else
          this.router.navigate(['home']);
      })
    })
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
        this.appUser.password=newPassword;
        this.appUserService.updateSelf(this.appUser).subscribe(response=>{
          this.showSnackbar("Password updated.");
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
