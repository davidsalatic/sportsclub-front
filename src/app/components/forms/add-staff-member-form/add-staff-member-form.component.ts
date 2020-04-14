import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from 'src/app/services/role-service';
import { AuthService } from 'src/app/services/auth-service';
import { AppUser } from 'src/app/models/app-user';
import { Roles } from 'src/app/const/role-const';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-add-staff-member-form',
  templateUrl: './add-staff-member-form.component.html',
  styleUrls: ['./add-staff-member-form.component.css']
})
export class AddStaffMemberFormComponent implements OnInit {


  addStaffUserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    username: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    role: new FormControl('', Validators.required)
  });

  constructor(private router:Router,
     private appUserService : AppUserService,private titleService:TitleService,
     private snackBar:MatSnackBar,private roleService:RoleService,private authService:AuthService) {
       this.titleService.changeTitle("Add staff member")
     }

  ngOnInit(): void {
    this.loadPageIfValidRole()
  }

  loadPageIfValidRole()
  {

    if(this.authService.getToken()){
      if(this.authService.getLoggedInRole()!=Roles.MANAGER)
        this.router.navigate(['home']);
    }

    else
      this.router.navigate(['login']);
  }

  onSubmit() {
    this.generateUserFromForm();
  }

  generateUserFromForm()
  {
    let role:string = this.addStaffUserForm.get('role').value;
    this.roleService.getByName(role).subscribe(dbRole=>{
      let staffMember = new AppUser();
      staffMember.role=dbRole;
      staffMember.username=this.addStaffUserForm.get('username').value;
      staffMember.name=this.addStaffUserForm.get('name').value;
      staffMember.surname=this.addStaffUserForm.get('surname').value;
      staffMember.jmbg=this.addStaffUserForm.get('jmbg').value;
      staffMember.address=this.addStaffUserForm.get('adress').value;
      staffMember.phoneNumber=this.addStaffUserForm.get('phoneNumber').value;
      this.addAppUserIfNotExists(staffMember);
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
      this.router.navigate(['/staff']);
    });
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }

}
