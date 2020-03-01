import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroup } from 'src/app/models/member-group';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddAppUserDialogComponent } from '../dialogs/add-app-user-dialog/add-app-user-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberGroupService } from 'src/app/services/member-group-service';

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  displayedColumns = ['id', 'name','surname','actions'];
  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  memberGroup: MemberGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  idPathVariable : number;

  constructor(private appUsersService:AppUserService,private memberGroupService:MemberGroupService, 
    private matDialog:MatDialog, private route:ActivatedRoute,private router:Router){
  }

  ngOnInit() {
    this.idPathVariable=this.route.snapshot.params['id'];
    this.loadGroup();
    this.loadUsersInGroup();
  }

  loadUsersInGroup() {
    this.appUsersService.getAllUsersInGroup(this.idPathVariable).subscribe(data => {
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadGroup()
  {
    this.memberGroupService.getGroupById(this.idPathVariable).subscribe(data=>{
      this.memberGroup=data;
    })
  }

  rename(newGroupName: string)
  {
    if(newGroupName)
    {
      this.memberGroup.name=newGroupName;
      this.memberGroupService.updateGroup(this.memberGroup).subscribe(response=>{
      this.router.navigate(['/members']);
      });
    }
  }

  deleteUser(appUser:AppUser)
  {
    if(confirm("Delete user '"+appUser.name+" "+ appUser.surname+" ?")) {
      this.appUsersService.deleteUser(appUser).subscribe(response=>{
        this.loadUsersInGroup();
      })
    }
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