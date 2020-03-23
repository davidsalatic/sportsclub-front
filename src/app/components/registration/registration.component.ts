import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  appUser:AppUser;

  LOGIN_URL :string="http://localhost:8080/login";

  passwordForm = new FormGroup({
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  });


  constructor(private snackBar:MatSnackBar,private authService:AuthService
    ,private route:ActivatedRoute,private appUserService:AppUserService,private router:Router) { }

  ngOnInit(): void {
    let token:string = this.route.snapshot.params['token'];
    this.loadAppUserFromToken(token);
  }

  loadAppUserFromToken(token:string)
  {
    this.authService.getToken().subscribe(retrievedToken=>{
      if(retrievedToken)
      {
        alert("Please log out of your user session first.")
        this.router.navigate(['home']);
      }
      else{
        this.authService.extractClaims(token).subscribe(claims=>{
          this.appUserService.getByUsername(claims.sub).subscribe(appUser=>{
            this.appUser=appUser;
            if(appUser.password!=null)
              window.location.href=this.LOGIN_URL;
          })
        })
      }
    })
  }

  onSubmit() {
    let password:string = this.passwordForm.get('password').value;
    let confirm:string = this.passwordForm.get('confirmPassword').value;

    if(password===confirm)
    {
      this.appUser.password=password;
      this.appUserService.updateSelf(this.appUser).subscribe(response=>{
        this.showSnackbar("Registration complete. Redirecting to login page...");
        this.passwordForm.disable();
        setTimeout(() => 
        {
            window.location.href=this.LOGIN_URL;
        },
        2500);
      })
      
    }
    else
      this.showSnackbar("Password do not match!")
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 2500
    })
  }

}
