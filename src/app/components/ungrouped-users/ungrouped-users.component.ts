import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-ungrouped-users',
  templateUrl: './ungrouped-users.component.html',
  styleUrls: ['./ungrouped-users.component.css']
})
export class UngroupedUsersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  displayedColumns = ['name'];

  constructor(private appUserService:AppUserService,private snackBar:MatSnackBar,
    private router:Router,private authService:AuthService,private titleService:TitleService){
      this.titleService.changeTitle("Ungrouped members");
    }

  ngOnInit() {
    this.loadPageIfValidRole();
  }


  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
        this.loadAppUsers();
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadAppUsers()
  {
    this.appUserService.getUngroupedMembers().subscribe(appUsers=>{
      this.dataSource.data=appUsers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewMemberClick(appUser:AppUser)
  {
    this.router.navigate(['/members/user/'+appUser.id+'/edit']);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
