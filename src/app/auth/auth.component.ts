import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppUser } from '../models/app-user';
import { AuthService } from '../services/auth-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private fb: FormBuilder,private authService:AuthService,private snackBar:MatSnackBar) {}

  onSubmit() {
  let appUser:AppUser= new  AppUser();
  appUser.username=this.loginForm.get('username').value;
  appUser.password=this.loginForm.get('password').value;
  
  this.authenticate(appUser);
  }

  authenticate(appUser:AppUser)
  {
    console.log(appUser);
    this.authService.authenticate(appUser).subscribe(token=>{
      if(token)
      {
        this.showSnackbar("Logged in.") 
        console.log(""+token.toString());
      }
      else
        this.showSnackbar("Incorrect username or password.")
    })
  }
  

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
