import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberGroup } from 'src/app/models/member-group';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
import { PeriodService } from 'src/app/services/period-service';
import { Period } from 'src/app/models/period';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})

export class SessionsComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<MemberGroup> = new MatTableDataSource();
  displayedColumns = ['name','actions'];
  currentMonth:number = new Date().getMonth()+1;
  currentYear:number = new Date().getFullYear();

  constructor(private memberGroupService:MemberGroupService,private router:Router,
    private authService:AuthService,private periodService:PeriodService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    let token:string = sessionStorage.getItem('user');
    if(token)
    this.authService.extractClaims(token).subscribe(claims=>{
      if(this.roleIsValid(claims))
        this.loadGroups();
      else
        this.router.navigate(['home']);
    })
    else
      this.router.navigate(['login']);
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role.name===Roles.COACH || claims.role.name===Roles.MANAGER
  }

  loadGroups()
  {
    this.memberGroupService.getAllGroups().subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewClick(memberGroupId:number)
  {
    let date:Date =new Date();
    let currentMonth:number = date.getMonth()+1;
    let currentYear:number = date.getFullYear();

    this.periodService.getPeriodByMonthAndYear(currentMonth,currentYear).subscribe(period=>{
      if(period)
        this.navigateToTrainingSessionsInGroupForPeriod(memberGroupId,period.id);
      else
      {
        let period:Period = new Period();
        period.month=currentMonth;
        period.year=currentYear;

        this.addPeriodAndNavigateToTrainingSessionsInGroup(period,memberGroupId);
      }
    })
  }

  navigateToTrainingSessionsInGroupForPeriod(memberGroupId: number, periodId: number) {
    this.router.navigate(['/sessions/group/'+memberGroupId+'/period/'+periodId]);
  }

  addPeriodAndNavigateToTrainingSessionsInGroup(period:Period,memberGroupId:number)
  {
    this.periodService.addPeriod(period).subscribe(()=>{
      this.periodService.getPeriodByMonthAndYear(period.month,period.year).subscribe(createdPeriod=>{
        this.navigateToTrainingSessionsInGroupForPeriod(memberGroupId,createdPeriod.id);
      })
    })
  }
}