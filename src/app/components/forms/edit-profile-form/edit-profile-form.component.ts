import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { AuthService } from 'src/app/services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css']
})
export class EditProfileFormComponent implements OnInit {
  
  appUser : AppUser;
  username:string;

  profileForm = new FormGroup({
    username: new FormControl ({value:'',disabled:true}),
    name: new FormControl (''),
    surname: new FormControl (''),
    jmbg: new FormControl(''),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    dateOfBirth: new FormControl ({value:'',disabled:true})
  });

  constructor(private router:Router,
    private appUserService : AppUserService, private authService:AuthService,
    private snackBar:MatSnackBar) { 
 }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())//is logged in
      this.checkToken();
    else
      this.router.navigate(['login']);
  }

  checkToken()
  {
    this.authService.extractClaims(this.authService.getToken()).subscribe(claims=>{
      if(claims)
      {
        this.username=claims.sub;
        this.loadAppUserByUsername(this.username);
      }
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
      phoneNumber: appUser.phoneNumber,
      dateOfBirth: appUser.dateOfBirth
    });
  }

  onSubmit()
  {
    this.appUser.address=this.profileForm.get('adress').value;
    this.appUser.phoneNumber=this.profileForm.get('phoneNumber').value;
    this.appUser.name=this.profileForm.get('name').value;
    this.appUser.surname=this.profileForm.get('surname').value;
    this.appUser.username=this.profileForm.get('username').value;

    this.appUserService.getByJmbg(this.profileForm.get('jmbg').value).subscribe(user=>{
      if(user && user.jmbg!=this.appUser.jmbg)
        this.showSnackbar("User with that JMBG already exists!");
      else
      {
        this.appUser.jmbg=this.profileForm.get('jmbg').value;
        this.updateAppUser();
      }
    })
  }

  updateAppUser()
  {
    this.appUserService.updateSelf(this.appUser).subscribe(()=>{
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
