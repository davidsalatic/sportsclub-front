import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';

@Component({
  selector: 'app-edit-app-user-form',
  templateUrl: './edit-app-user-form.component.html',
  styleUrls: ['./edit-app-user-form.component.css']
})
export class EditAppUserFormComponent implements OnInit {

  idPathVariable:number;
  appUser : AppUser;
  idOfOriginalGroup : number;
  memberGroups :MemberGroup[];

  appUserForm = new FormGroup({
    username: new FormControl('',Validators.required),
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    dateJoined: new FormControl('',Validators.required),
    memberGroups: new FormControl('')
  });

  constructor(private route:ActivatedRoute, private router:Router,
    private appUserService : AppUserService, private memberGroupService: MemberGroupService) { 
    
 }

  ngOnInit(): void {
    this.idPathVariable=this.route.snapshot.params['id'];
    this.loadUser();

  }

  loadUser()
  {
    this.appUserService.getUserById(this.idPathVariable).subscribe(data=>{
      this.appUser=data;
      this.idOfOriginalGroup=this.appUser.memberGroup.id;
      this.updateFormWithUserData(this.appUser);
      this.memberGroupService.getAllGroups().subscribe(data=>{
        this.memberGroups=data;
        for(let i=0;i<this.memberGroups.length;i++)
        {
          if(this.memberGroups[i].id===this.appUser.memberGroup.id)
          {
            let temp:MemberGroup= this.memberGroups[0]
            this.memberGroups[0]=this.memberGroups[i];
            this.memberGroups[i]=temp;
            break;
          }
        }
      })
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

  onSubmit()
  {
    if(this.appUserForm.get('memberGroups').value)
      this.appUser.memberGroup=this.appUserForm.get('memberGroups').value;
    this.appUser.name=this.appUserForm.get('name').value;
    this.appUser.surname=this.appUserForm.get('surname').value;
    this.appUser.jmbg=this.appUserForm.get('jmbg').value;
    this.appUser.address=this.appUserForm.get('adress').value;
    this.appUser.phoneNumber=this.appUserForm.get('phoneNumber').value;

    this.appUser.dateJoined=this.appUserForm.get('dateJoined').value;
    
    this.appUser.username = this.appUserForm.get('username').value;
    this.appUserService.updateUser(this.appUser).subscribe(response=>{
    this.router.navigate(['/members/'+this.idOfOriginalGroup]);
    });
  }
}