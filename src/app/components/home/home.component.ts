import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router,private titleService:TitleService) {
    this.titleService.changeTitle("Home");
   }

  ngOnInit(): void {
    if(!this.authService.getToken())
      this.router.navigate(['login']);

  }
}
