import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';
import { AuthService } from 'src/app/services/auth-service';
import { Roles } from 'src/app/const/role-const';
import { AppUserService } from 'src/app/services/app-user-service';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/models/app-user';
import { AttendanceService } from 'src/app/services/attendance-service';

@Component({
  selector: 'app-my-attendances',
  templateUrl: './my-attendances.component.html',
  styleUrls: ['./my-attendances.component.css']
})
export class MyAttendancesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<Attendance> = new MatTableDataSource();

  displayedColumns = ['date'];

  constructor(private authService:AuthService,private appUserService:AppUserService,
    private router:Router,private attendanceService:AttendanceService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }


  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      console.log(token);
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && claims.role===Roles.MEMBER)
        {
          this.loadUserAndAttendances(claims.sub);
        }
        else
          this.router.navigate(['home']);
      })
    })
  }

  loadUserAndAttendances(username:string)
  {
    this.appUserService.getByUsername(username).subscribe(user=>{
      console.log(user);
      this.attendanceService.getByAppUser(user).subscribe(data=>{
        console.log(data);
        this.dataSource.data=data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }
}
