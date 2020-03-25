import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-ungrouped-users',
  templateUrl: './ungrouped-users.component.html',
  styleUrls: ['./ungrouped-users.component.css']
})
export class UngroupedUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  displayedColumns = ['name','actions'];

  constructor(private appUserService:AppUserService,private snackBar:MatSnackBar,
    private router:Router,private authService:AuthService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }


  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    this.authService.extractClaims(this.authService.getToken()).subscribe(claims=>{
      if(this.roleIsValid(claims))
        this.loadAppUsers();
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

  loadAppUsers()
  {
    this.appUserService.getUngroupedMembers().subscribe(appUsers=>{
      this.dataSource.data=appUsers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteUser(appUser:AppUser)
  {
    if(confirm("Delete user '"+appUser.name+" "+ appUser.surname+" and all payments and attendances connected?"))
    this.appUserService.deleteUser(appUser).subscribe(response=>{
      this.loadAppUsers();
      this.showSnackbar("User "+appUser.name+" "+appUser.surname+" deleted.");
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
