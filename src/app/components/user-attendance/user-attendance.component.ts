import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/services/attendance-service';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';

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

  constructor(private authService:AuthService,private router:Router,
    private attendanceService:AttendanceService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    this.authService.extractClaims(this.authService.getToken()).subscribe(claims=>{
      if(this.roleIsValid(claims))
      {
        let appUserId = this.activatedRoute.snapshot.params['appUserId'];
        this.loadAttendancesForUser(appUserId);
      }
      else
        this.router.navigate(['home']);
    })
    else
      this.router.navigate(['login']);
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role.name===Roles.COACH || claims.role.name===Roles.MANAGER ||  claims.role.name===Roles.MEMBER;
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
