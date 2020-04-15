import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './services/auth-service';
import { Roles } from './const/role-const';
import { Router } from '@angular/router';
import { PeriodService } from './services/period-service';
import { Period } from './models/period';
import { TitleService } from './services/title-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  
  title:string='Sports Club';

  showTrainingSessions:boolean=false;
  showMemberships:boolean=false;
  showMembers:boolean=false;
  showStaff:boolean=false;
  showCompetitions:boolean=false;
  isLoggedIn=false;
  showMyAttendances:boolean=false;
  showMyPayments:boolean=false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,private authService:AuthService,
    private router:Router,private periodService:PeriodService,private titleService:TitleService) {
  }

  ngOnInit() {
    this.createPeriodIfNotExistAndShowMenuItems();
    this.trackTitleChange();
  }

  trackTitleChange()
  {
    this.titleService.title.subscribe(changedTitle=>{
      this.title=changedTitle;
    })
  }

  createPeriodIfNotExistAndShowMenuItems()
  {
    let date:Date = new Date();
    let currentMonth:number = date.getMonth()+1;
    let currentYear:number = date.getFullYear();
    this.periodService.getPeriodByMonthAndYear(currentMonth,currentYear).subscribe(period=>{
      if(period){
        //exists
      }
      else
      {
        let newPeriod:Period = new Period();
        newPeriod.month=currentMonth;
        newPeriod.year=currentYear;
        this.periodService.addPeriod(newPeriod).subscribe(response=>{
          //period added for this month
        })
      }
      this.trackLoginStatusAndHandleMenuItems();
    })

  }

  trackLoginStatusAndHandleMenuItems()
  {
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
      this.showMyAttendances=true;
      this.showMyPayments=true;
    }
    else if(role===Roles.COACH)
    {
      this.showTrainingSessions=true;
      this.showMemberships=false;
      this.showMembers=true;
      this.showStaff=false;
      this.showCompetitions=true;
      this.showMyPayments=false;
      this.showMyAttendances=false;
    }
    else if(role===Roles.MANAGER)
    {
      this.showTrainingSessions=true;
      this.showMembers=true;
      this.showMemberships=true;
      this.showStaff=true;
      this.showCompetitions=true;
      this.showMyPayments=false;
      this.showMyAttendances=false;
    }
  }

  logout()
  {
    this.authService.clearSession();
    this.router.navigate(['login'])
  }
}
