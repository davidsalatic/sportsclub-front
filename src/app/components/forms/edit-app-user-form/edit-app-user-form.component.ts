import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';

@Component({
  selector: 'app-edit-app-user-form',
  templateUrl: './edit-app-user-form.component.html',
  styleUrls: ['./edit-app-user-form.component.css']
})
export class EditAppUserFormComponent implements OnInit {

  appUser : AppUser;
  //for returning back to the original group component
  idOfOriginalGroup : number;
  memberGroups :MemberGroup[];

  appUserForm = new FormGroup({
    username: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    dateJoined: new FormControl(''),
    memberGroups: new FormControl('')
  });

  constructor(private route:ActivatedRoute, private router:Router,
    private appUserService : AppUserService, private authService:AuthService,
    private memberGroupService: MemberGroupService,private snackBar:MatSnackBar) { 
    
 }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && this.roleIsValid(claims))
          {
            let appUserId=this.route.snapshot.params['id'];
            this.loadAppUser(appUserId);
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

  loadAppUser(appUserId:number)
  {
    this.appUserService.getUserById(appUserId).subscribe(appUser=>{
      this.appUser=appUser;
      if(appUser.memberGroup!=null)
        this.idOfOriginalGroup=this.appUser.memberGroup.id;
      this.updateFormWithUserData(this.appUser);
      this.populateMemberGroupDropDown();
    })
  }

  updateFormWithUserData(appUser:AppUser)
  {
    this.appUserForm.patchValue({
      username:appUser.username,
      name: appUser.name, 
      surname:appUser.surname,
      jmbg: appUser.jmbg,
      adress: appUser.address,
      phoneNumber: appUser.phoneNumber,
      dateJoined: appUser.dateJoined
    });
  }

  populateMemberGroupDropDown()
  {
    this.memberGroupService.getAllGroups().subscribe(data=>{
      this.memberGroups=data;
      if(this.appUser.memberGroup!=null)
        for(let i=0;i<this.memberGroups.length;i++)
        {
          if(this.memberGroupIsUsersGroup(this.memberGroups[i],this.appUser))
          {
            let temp:MemberGroup= this.memberGroups[0]
            this.memberGroups[0]=this.memberGroups[i];
            this.memberGroups[i]=temp;
            break;
          }
        }
    })
  }

  memberGroupIsUsersGroup(memberGroup:MemberGroup,appUser:AppUser)
  {
    return memberGroup.id===appUser.memberGroup.id;
  }

  onSubmit()
  {
    if(this.appUserForm.get('memberGroups').value)
      this.appUser.memberGroup=this.appUserForm.get('memberGroups').value;
    this.appUser.name=this.appUserForm.get('name').value;
    this.appUser.surname=this.appUserForm.get('surname').value;
    this.appUser.jmbg=this.appUserForm.get('jmbg').value;
    this.appUser.address=this.appUserForm.get('adress').value;
    this.appUser.phoneNumber=this.appUserForm.get('phoneNumber').value;

    let formDate : Date =this.appUserForm.get('dateJoined').value;
    //if date has changed
    if(formDate!=this.appUser.dateJoined)
    {
      formDate.setDate(formDate.getDate()+1);
      this.appUser.dateJoined=formDate;
    }
    else
      this.appUser.dateJoined=this.appUserForm.get('dateJoined').value;
    
    this.appUser.username = this.appUserForm.get('username').value;

    this.updateAppUserIfNotExists(this.appUser);

  }

  updateAppUserIfNotExists(appUser:AppUser)
  {
    this.appUserService.getByUsername(appUser.username).subscribe(data=>{
      if(data && data.username!=this.appUser.username)
        this.showSnackbar("A user with that username already exists!")
      else
        this.appUserService.getByJmbg(appUser.jmbg).subscribe(data=>{
          if(data && data.jmbg!=this.appUser.jmbg)
            this.showSnackbar("A user with that JMBG already exists!");
          else
              this.updateUserAndGoToRoute();
        })
    })
  }

  updateUserAndGoToRoute()
  {
    this.appUserService.updateUser(this.appUser).subscribe(response=>{
      if(this.idOfOriginalGroup!=null)
        this.router.navigate(['/members/'+this.idOfOriginalGroup]);
      else
        this.router.navigate(['/members/users/ungrouped']);
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