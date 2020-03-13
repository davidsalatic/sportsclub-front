import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { AuthService } from 'src/app/services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {
  
  appUser : AppUser;
  username:string;

  profileForm = new FormGroup({
    username: new FormControl ({value: '', disabled: true},),
    name: new FormControl ({value: '', disabled: true}),
    surname: new FormControl ({value: '', disabled: true}),
    jmbg: new FormControl({value: '', disabled: true}),
    adress: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  constructor(private route:ActivatedRoute, private router:Router,
    private appUserService : AppUserService, private authService:AuthService,
    private snackBar:MatSnackBar) { 
 }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims)
          {
            this.checkToken()
          }
        else
          this.router.navigate(['home']);
      })
    })
  }

  checkToken()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims)
        {
          this.username=claims.sub;
          this.loadAppUserByUsername(this.username);
        }
        else
        this.router.navigate(['home']);
      })
    })
  }

  loadAppUserByUsername(username:string)
  {
    this.appUserService.getByUsername(username).subscribe(user=>{
      this.appUser=user;
      this.updateFormWithUserData(this.appUser)
    })
  }

  updateFormWithUserData(appUser:AppUser)
  {
    this.profileForm.patchValue({
      username:appUser.username,
      name: appUser.name, 
      surname:appUser.surname,
      jmbg: appUser.jmbg,
      adress: appUser.address,
      phoneNumber: appUser.phoneNumber
    });
  }

  onSubmit()
  {
    
    this.appUser.address=this.profileForm.get('adress').value;
    this.appUser.phoneNumber=this.profileForm.get('phoneNumber').value;

    this.updateAppUser(this.appUser);
  }

  updateAppUser(appUser:AppUser)
  {
    this.appUserService.updateSelf(this.appUser).subscribe(response=>{
      this.router.navigate(['/profile']);
      this.showSnackbar("User edited.")
    });
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
