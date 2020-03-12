import { Component, OnInit } from '@angular/core';
import { AppUserService } from 'src/app/services/app-user-service';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getToken().subscribe(user=>{
      if(user)
      {
        sessionStorage.setItem('user',user);
      }
      else
      {
        window.location.href="http://localhost:8080/login"
      }
    })
  }



}