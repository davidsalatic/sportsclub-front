import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AppUserService } from './services/app-user-service';
import { AuthService } from './services/auth-service';
import { Roles } from './const/role-const';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sports Club';

  showTrainingSessions:boolean=false;
  showMemberships:boolean=false;
  showMembers:boolean=false;
  showStaff:boolean=false;
  isLoggedIn=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService,private router:Router) {
  }

  ngOnInit() {

    this.displayMenuItems();

  }

  displayMenuItems()
  {
    let token:string = sessionStorage.getItem('user');
    if(token)
    {
      this.isLoggedIn=true;
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims.role.name===Roles.MEMBER)
        {
          this.showTrainingSessions=false;
          this.showMemberships=false;
            this.showMembers=false;
          this.showStaff=false;
        }
        else if(claims.role.name===Roles.COACH)
        {
          this.showTrainingSessions=true;
          this.showMemberships=false;
          this.showMembers=true;
          this.showStaff=false;
        }
        else if(claims.role.name===Roles.MANAGER)
        {
          this.showTrainingSessions=true;
          this.showMembers=true;
          this.showMemberships=true;
          this.showStaff=true;
        }
        else
        {
          this.showTrainingSessions=false;
          this.showMembers=false;
          this.showMemberships=false;
          this.showStaff=false;
        }
    }
    )}
    else
    {
      this.isLoggedIn=false;
    }
  }

  logout()
  {
    sessionStorage.clear();
    window.location.href="http://localhost:8082/logout"
  }
}
