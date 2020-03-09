import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';

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

  constructor(private appUserService:AppUserService){}

  ngOnInit() {
    this.loadAppUsers();
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
    
  }
}
