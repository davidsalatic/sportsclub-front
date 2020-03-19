import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppUser } from 'src/app/models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleService } from 'src/app/services/role-service';
import { Roles } from 'src/app/const/role-const';
import { AuthService } from 'src/app/services/auth-service';
import { Claims } from 'src/app/models/helpers/claims';

@Component({
  selector: 'app-add-app-user-form',
  templateUrl: './add-app-user-form.component.html',
  styleUrls: ['./add-app-user-form.component.css']
})
export class AddAppUserFormComponent implements OnInit {

  memberGroup : MemberGroup;

  appUserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    username: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    dateJoined: new FormControl('')
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
            let memberGroupId=this.route.snapshot.params['id'];
            this.loadMemberGroup(memberGroupId);
          }
        else
          this.router.navigate(['home']);
      })
    })
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role===Roles.COACH || claims.role===Roles.MANAGER
  }

  loadMemberGroup(memberGroupId:number)
  {
    this.memberGroupService.getGroupById(memberGroupId).subscribe(data=>{
      this.memberGroup=data;
    })
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
      if(formDate)
      {
        formDate.setDate(formDate.getDate()+1);
        appUser.dateJoined=formDate;
      }
      appUser.memberGroup=this.memberGroup;

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
      this.router.navigate(['/members/'+this.memberGroup.id]);
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
