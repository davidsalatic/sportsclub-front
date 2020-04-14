import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from 'src/app/services/title-service';
import { Roles } from 'src/app/const/role-const';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  displayedColumns = ['name','role'];

  constructor(private authService:AuthService,private router:Router,private titleService:TitleService,
    private appUserService:AppUserService,private snackBar:MatSnackBar){
      this.titleService.changeTitle("Staff members")
    }

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isManagerLoggedIn())
      this.loadStaff();
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadStaff()
  {
    this.appUserService.getStaff().subscribe(staff=>{
      this.dataSource.data=staff;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

 viewStaffClick(appUser:AppUser)
 {
   if(appUser.role.name===Roles.COACH)
   {
     this.router.navigate(['/staff/'+appUser.id+'/edit']);
   }
 }

 showSnackbar(message:string)
 {
   this.snackBar.open(message, "X",{
     duration: 1500
   })
 }
}
