import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance-service';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-user-attendance',
  templateUrl: './user-attendance.component.html',
  styleUrls: ['./user-attendance.component.css']
})
export class UserAttendanceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Attendance> = new MatTableDataSource();

  displayedColumns = ['date'];
  loggedInRole:string;
  appUserId:number;

  constructor(private authService:AuthService,private titleService:TitleService,
    private router:Router,private attendanceService:AttendanceService,
    private activatedRoute:ActivatedRoute) {
      this.titleService.changeTitle("Member attendance");
     }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    {
      this.appUserId = this.activatedRoute.snapshot.params['appUserId'];
      this.loadAttendancesForUser(this.appUserId);
      this.loggedInRole=this.authService.getLoggedInRole();
    }
    else
      this.router.navigate(['login']);
  }

  loadAttendancesForUser(appUserId:number)
  {
    this.attendanceService.getByAppUser(appUserId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
