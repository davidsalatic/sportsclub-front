import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { LoginDTO } from 'src/app/models/helpers/login-dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('',Validators.compose([Validators.required,Validators.email])),
    password: new FormControl('',Validators.compose([Validators.required]))
  });


  constructor(private snackBar:MatSnackBar,private authService:AuthService
    ,private route:ActivatedRoute,private appUserService:AppUserService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let password:string = this.loginForm.get('password').value;
    let username:string = this.loginForm.get('username').value;

    let loginDTO:LoginDTO = new LoginDTO();
    loginDTO.username=username;
    loginDTO.password=password;

    this.authService.login(loginDTO).subscribe(tokenDTO=>{
      console.log(tokenDTO);
      if(tokenDTO)
      {
        sessionStorage.setItem('user',tokenDTO.token);
        this.router.navigate(['home']);
      }
      else
        this.showSnackbar("Incorrect username/password combination.")
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 2500
    })
  }

}
