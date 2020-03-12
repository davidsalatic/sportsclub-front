import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
import { AppUserService } from 'src/app/services/app-user-service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  displayedColumns = ['name','actions'];

  usernameOfLoggedInStaff :string;

  constructor(private authService:AuthService,private router:Router,private appUserService:AppUserService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && this.roleIsValid(claims))
            {
              this.usernameOfLoggedInStaff=claims.sub;
              this.loadStaff();
            }
        else
          this.router.navigate(['home']);
      })
    })
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role===Roles.MANAGER
  }

  loadStaff()
  {
    this.appUserService.getStaff().subscribe(staff=>{
      this.dataSource.data=staff;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
