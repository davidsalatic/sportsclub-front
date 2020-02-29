import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroup } from 'src/app/models/member-group';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddAppUserDialogComponent } from '../dialogs/add-app-user-dialog/add-app-user-dialog.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  displayedColumns = ['id', 'name','surname','actions'];
  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  groupId : number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private appUsersService:AppUserService, private matDialog:MatDialog, private route:ActivatedRoute){
  }

  ngOnInit() {
    this.groupId = this.route.snapshot.params['id'];
    this.loadUsersInGroup(this.groupId);
  }

  loadUsersInGroup(groupId:number) {
    this.appUsersService.getAllUsersInGroup(groupId).subscribe(data => {
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AddAppUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(groupName=>{
      //ADD MEMBER
    })
  }
}