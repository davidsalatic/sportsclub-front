import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { TitleService } from 'src/app/services/title-service';

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
    username: new FormControl('',Validators.email),
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    dateJoined: new FormControl(''),
    memberGroups: new FormControl(''),
    dateOfBirth: new FormControl({value:'',disabled:true}),
    gender: new FormControl({value:'',disabled:true})
  });

  constructor(private route:ActivatedRoute, private router:Router,private titleService:TitleService,
    private appUserService : AppUserService, private authService:AuthService,
    private memberGroupService: MemberGroupService,private snackBar:MatSnackBar) { 
    
 }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }
  
  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {            
        let appUserId=this.route.snapshot.params['id'];
        this.loadAppUser(appUserId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadAppUser(appUserId:number)
  {
    this.appUserService.getUserById(appUserId).subscribe(appUser=>{
      this.appUser=appUser;
      this.titleService.changeTitle(appUser.name+" "+appUser.surname);
      if(appUser.memberGroup!=null)
        this.idOfOriginalGroup=this.appUser.memberGroup.id;
      this.updateFormWithUserData();
      this.populateMemberGroupDropDown();
    })
  }

  updateFormWithUserData()
  {
    this.appUserForm.patchValue({
      username:this.appUser.username,
      name: this.appUser.name, 
      surname:this.appUser.surname,
      jmbg: this.appUser.jmbg,
      adress: this.appUser.address,
      phoneNumber: this.appUser.phoneNumber,
      dateJoined: this.appUser.dateJoined,
      dateOfBirth: this.appUser.dateOfBirth,
      gender: this.appUser.gender
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
    this.appUser.address=this.appUserForm.get('adress').value;
    this.appUser.phoneNumber=this.appUserForm.get('phoneNumber').value;
    this.appUser.jmbg=this.appUserForm.get('jmbg').value;

    let formDateJoined : Date =this.appUserForm.get('dateJoined').value;
    //if date has changed
    if(formDateJoined!=this.appUser.dateJoined)
    {
      formDateJoined.setDate(formDateJoined.getDate()+1);
      this.appUser.dateJoined=formDateJoined;
    }
    else
      this.appUser.dateJoined=this.appUserForm.get('dateJoined').value;

    this.updateAppUserIfValid(this.appUserForm.get('username').value,this.appUserForm.get('jmbg').value);

  }

  updateAppUserIfValid(username:string,jmbg:string)
  {
    this.appUserService.getByJmbg(jmbg).subscribe(data=>{
      if(data)
      {
        if(data.id===this.appUser.id)
        {
          if(username)
          {
            this.appUserService.getByUsername(username).subscribe(data=>{
              if(data && data.username!=this.appUser.username)
                this.showSnackbar("A user with that username already exists!")
              else
                this.updateUserAndGoToRoute();
            })
          }
          else
            this.updateUserAndGoToRoute();
        }
        else
        this.showSnackbar("A user with that JMBG already exists!");
      }
      else
          this.updateUserAndGoToRoute();
    })
  }

  updateUserAndGoToRoute()
  {
    this.appUser.username=this.appUserForm.get('username').value;
    this.appUserService.updateUser(this.appUser).subscribe(()=>{
      this.navigateBack();
      this.showSnackbar("User edited.")
    });
  }

  navigateBack()
  {
    if(this.idOfOriginalGroup!=null)
      this.router.navigate(['/members/'+this.idOfOriginalGroup]);
    else
      this.router.navigate(['/members/users/ungrouped']);
  }

  deleteMember()
  {
    if(confirm("Delete user '"+this.appUser.name+" "+ this.appUser.surname+" and all payments and attendances connected?"))
      this.appUserService.deleteUser(this.appUser).subscribe(response=>{
        this.showSnackbar("User "+this.appUser.name+" "+this.appUser.surname+" deleted.");
        this.navigateBack();
      })
 }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}