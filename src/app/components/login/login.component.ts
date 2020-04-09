import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { LoginDTO } from 'src/app/models/helpers/login-dto';
import { TitleService } from 'src/app/services/title-service';

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
    ,private router:Router,private titleService:TitleService) {
      this.titleService.changeTitle("Sports Club");
     }

  ngOnInit(): void {
    if(this.authService.getToken())
      this.router.navigate(['home']);
  }

  onSubmit() {
    let password:string = this.loginForm.get('password').value;
    let username:string = this.loginForm.get('username').value;

    let loginDTO:LoginDTO = new LoginDTO();
    loginDTO.username=username;
    loginDTO.password=password;

    this.authService.login(loginDTO).subscribe(tokenDTO=>{
      if(tokenDTO)
      {
        this.authService.extractClaims(tokenDTO.token).subscribe(claims=>{
          this.authService.setLoggedInRole(claims.role.name);
          this.authService.setToken(tokenDTO.token);
          this.authService.setLoggedInUsername(claims.sub);

          if(this.authService.getRouteAfterLogin())
          {
            let route:string = this.authService.getRouteAfterLogin();
            this.router.navigate([route]);
            this.authService.clearRouteAfterLogin();
          }
          else
            this.router.navigate(['home']);
        })
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
