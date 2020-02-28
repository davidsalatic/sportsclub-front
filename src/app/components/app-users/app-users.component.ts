import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroup } from 'src/app/models/member-group';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddAppUserDialogComponent } from '../dialogs/add-app-user-dialog/add-app-user-dialog.component';

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  displayedColumns = ['id', 'name','surname','actions'];
  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  @Input() selectedGroup:MemberGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(private appUsersService:AppUserService, private matDialog:MatDialog){
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.selectedGroup.id) {
      this.loadUsersInGroup();
    }
  }

  loadUsersInGroup() {
    this.appUsersService.getAllUsersInGroup(this.selectedGroup.id).subscribe(data => {
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