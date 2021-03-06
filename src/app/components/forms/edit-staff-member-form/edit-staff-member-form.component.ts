import { Component, OnInit } from '@angular/core';
import { AppUser } from 'src/app/models/app-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { AuthService } from 'src/app/services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-edit-staff-member-form',
  templateUrl: './edit-staff-member-form.component.html',
  styleUrls: ['./edit-staff-member-form.component.css']
})
export class EditStaffMemberFormComponent implements OnInit {

  appUser : AppUser;

  staffMemberForm = new FormGroup({
    // username: new FormControl('',Validators.required),
    username: new FormControl ({value: '', disabled: true}, Validators.required),
    name: new FormControl('',Validators.required),
    surname: new FormControl('',Validators.required),
    jmbg: new FormControl('',Validators.compose([Validators.required,Validators.minLength(13),Validators.maxLength(13)])),
    adress: new FormControl(''),
    phoneNumber: new FormControl('')
  });

  constructor(private route:ActivatedRoute, private router:Router,
    private appUserService : AppUserService, private authService:AuthService,
    private snackBar:MatSnackBar,private titleService:TitleService) { 
 }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isManagerLoggedIn())
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
      this.updateFormWithUserData(this.appUser);
      this.titleService.changeTitle(this.appUser.name+" "+this.appUser.surname);
    })
  }

  updateFormWithUserData(appUser:AppUser)
  {
    this.staffMemberForm.patchValue({
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
    this.appUser.name=this.staffMemberForm.get('name').value;
    this.appUser.surname=this.staffMemberForm.get('surname').value;
    this.appUser.jmbg=this.staffMemberForm.get('jmbg').value;
    this.appUser.address=this.staffMemberForm.get('adress').value;
    this.appUser.phoneNumber=this.staffMemberForm.get('phoneNumber').value;
    this.appUser.username = this.staffMemberForm.get('username').value;

    this.updateAppUser(this.appUser);
  }

  updateAppUser(appUser:AppUser)
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
    this.appUserService.updateUser(this.appUser).subscribe(()=>{
      this.navigateToStaffMembers();
      this.showSnackbar("User edited.")
    });
  }

  navigateToStaffMembers()
  {
    this.router.navigate(['/staff']);
  }

  deleteStaffMember()
  {
    if(confirm("Delete staff member '"+this.appUser.name+" "+ this.appUser.surname+"?"))
    this.appUserService.deleteUser(this.appUser).subscribe(response=>{
      this.navigateToStaffMembers();
      this.showSnackbar("User "+this.appUser.name+" "+this.appUser.surname+" deleted.");
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
