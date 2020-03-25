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
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private authService:AuthService,private router:Router,
    private appUserService:AppUserService,private snackBar:MatSnackBar){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    this.authService.extractClaims(this.authService.getToken()).subscribe(claims=>{
      if(this.roleIsValid(claims))
      this.loadStaff();
      else
        this.router.navigate(['home']);
    })
    else
      this.router.navigate(['login']);
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role.name===Roles.MANAGER
  }

  loadStaff()
  {
    this.appUserService.getStaff().subscribe(staff=>{
      this.dataSource.data=staff;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteUser(appUser:AppUser)
  {
    if(confirm("Delete staff member '"+appUser.name+" "+ appUser.surname+"?"))
      this.appUserService.deleteUser(appUser).subscribe(response=>{
        this.loadStaff();
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
