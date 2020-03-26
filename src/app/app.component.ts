import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
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
  showCompetitions:boolean=false;
  isLoggedIn=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService,private router:Router) {
  }

  ngOnInit() {
    if(this.authService.getToken())
      this.authService.changeIsLoggedIn(true);
    else
      this.authService.changeIsLoggedIn(false);

    this.authService.isLoggedIn.subscribe(isLoggedIn=>{
      this.isLoggedIn=isLoggedIn;
      if(isLoggedIn)
        this.displayMenuItemsDependingOnRole(this.authService.getLoggedInRole());
    })
  }

  displayMenuItemsDependingOnRole(role:string)
  {
    if(role===Roles.MEMBER)
    {
      this.showTrainingSessions=false;
      this.showMemberships=false;
      this.showMembers=false;
      this.showStaff=false;
      this.showCompetitions=true;
    }
    else if(role===Roles.COACH)
    {
      this.showTrainingSessions=true;
      this.showMemberships=false;
      this.showMembers=true;
      this.showStaff=false;
      this.showCompetitions=true;
    }
    else if(role===Roles.MANAGER)
    {
      this.showTrainingSessions=true;
      this.showMembers=true;
      this.showMemberships=true;
      this.showStaff=true;
      this.showCompetitions=true;
    }
  }

  logout()
  {
    this.authService.clearSession();
    this.router.navigate(['login'])
  }
}
