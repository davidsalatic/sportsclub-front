import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AppUser } from 'src/app/models/app-user';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { AppUserService } from 'src/app/services/app-user-service';

@Component({
  selector: 'app-add-app-user-form',
  templateUrl: './add-app-user-form.component.html',
  styleUrls: ['./add-app-user-form.component.css']
})
export class AddAppUserFormComponent implements OnInit {

  idPathVariable:number;
  memberGroup : MemberGroup;

  appUserForm = new FormGroup({
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl(''),
    username: new FormControl(''),
    dateJoined: new FormControl('',Validators.required,)
  });


  constructor(private route:ActivatedRoute, private router:Router,
     private appUserService : AppUserService, private memberGroupService : MemberGroupService) { 
    
  }

  ngOnInit(): void {
    this.idPathVariable=this.route.snapshot.params['id'];
    this.loadGroup();
  }

  loadGroup()
  {
    this.memberGroupService.getGroupById(this.idPathVariable).subscribe(data=>{
      this.memberGroup=data;
    })
  }

  onSubmit() {
    let appUser = this.generateUserFromForm();
    this.appUserService.addUser(appUser).subscribe(response=>{
      this.router.navigate(['/members/'+this.idPathVariable]);
    });
  }

  generateUserFromForm() : AppUser
  {
    let appUser = new AppUser();
    appUser.username=this.appUserForm.get('username').value;
    appUser.name=this.appUserForm.get('name').value;
    appUser.surname=this.appUserForm.get('surname').value;
    appUser.jmbg=this.appUserForm.get('jmbg').value;
    appUser.adress=this.appUserForm.get('adress').value;
    appUser.phoneNumber=this.appUserForm.get('phoneNumber').value;
    appUser.dateJoined=this.appUserForm.get('dateJoined').value;
    appUser.memberGroup=this.memberGroup;
    //PASSWORD CREATED BY JMBG VALUE, USER SHOULD BE ABLE TO CHANGE IT LATER
    appUser.password=appUser.jmbg;
    return appUser;
  }
}
