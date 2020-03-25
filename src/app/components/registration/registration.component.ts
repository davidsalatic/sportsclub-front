import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { AppUser } from 'src/app/models/app-user';
import { RegisterDTO } from 'src/app/models/helpers/register-dto';
import { TokenDTO } from 'src/app/models/helpers/token-dto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  token:string;

  passwordForm = new FormGroup({
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required)
  });

  constructor(private snackBar:MatSnackBar,private authService:AuthService
    ,private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params['token'];

    let tokenDTO:TokenDTO = new TokenDTO();
    tokenDTO.token=this.token;
    this.authService.checkToken(tokenDTO).subscribe(isValid=>{
      if(!isValid)
      {
        //already registered redirect to login
        this.router.navigate(['login']); 
      }
    }) 
  }
  
  onSubmit() {
    let password:string = this.passwordForm.get('password').value;
    let confirm:string = this.passwordForm.get('confirmPassword').value;

    if(password===confirm)
    {
      let registerDTO:RegisterDTO = new RegisterDTO();
      registerDTO.token=this.token;
      registerDTO.password=password;

      this.authService.register(registerDTO).subscribe(response=>{
        this.showSnackbar("Registration complete. Redirecting to login page...");
        this.passwordForm.disable();
        setTimeout(() => 
        {
            this.router.navigate(['login'])
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
