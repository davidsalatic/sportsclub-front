import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from 'src/app/services/role-service';
import { AuthService } from 'src/app/services/auth-service';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-add-staff-member-form',
  templateUrl: './add-staff-member-form.component.html',
  styleUrls: ['./add-staff-member-form.component.css']
})
export class AddStaffMemberFormComponent implements OnInit {


  appUserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    username: new FormControl('',Validators.required)
  });

  constructor(private route:ActivatedRoute, private router:Router,
     private appUserService : AppUserService, private memberGroupService : MemberGroupService,
     private snackBar:MatSnackBar,private roleService:RoleService,private authService:AuthService) {}

  ngOnInit(): void {
    this.loadPageIfValidRole()
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && this.roleIsValid(claims))
          {
            
          }
        else
          this.router.navigate(['home']);
      })
    })
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role===Roles.MANAGER
  }

  onSubmit() {
    this.generateUserFromForm();
  }

  generateUserFromForm()
  {
    this.roleService.getByName(Roles.MEMBER).subscribe(role=>{
      let appUser = new AppUser();
      appUser.role=role;
      appUser.username=this.appUserForm.get('username').value;
      appUser.name=this.appUserForm.get('name').value;
      appUser.surname=this.appUserForm.get('surname').value;
      appUser.jmbg=this.appUserForm.get('jmbg').value;
      appUser.address=this.appUserForm.get('adress').value;
      appUser.phoneNumber=this.appUserForm.get('phoneNumber').value;
  
      let formDate : Date =this.appUserForm.get('dateJoined').value;
      formDate.setDate(formDate.getDate()+1);
  
      appUser.dateJoined=formDate;
      //PASSWORD CREATED BY JMBG VALUE, USER SHOULD BE ABLE TO CHANGE IT LATER
      appUser.password=appUser.jmbg;
      
      this.addAppUserIfNotExists(appUser);
    })
 
  }

  addAppUserIfNotExists(appUser:AppUser)
  {
    this.appUserService.getByUsername(appUser.username).subscribe(data=>{
      if(data)
        this.showSnackbar("A user with that username already exists!")
      else
        this.appUserService.getByJmbg(appUser.jmbg).subscribe(data=>{
          if(data)
            this.showSnackbar("A user with that JMBG already exists!");
          else
            this.addAppUser(appUser);
        })
    })
  }

  addAppUser(appUser:AppUser)
  {
    this.appUserService.addUser(appUser).subscribe(response=>{
      this.showSnackbar("User "+appUser.name+ " "+appUser.surname+" created")
    });
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }

}
