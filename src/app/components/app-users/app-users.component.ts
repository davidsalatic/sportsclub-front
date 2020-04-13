import { Component, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroup } from 'src/app/models/member-group';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { TitleService } from 'src/app/services/title-service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddMemberGroupDialogComponent } from '../dialogs/add-member-group-dialog/add-member-group-dialog.component';

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  displayedColumns = ['name'];
  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  memberGroup: MemberGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appUsersService:AppUserService,private memberGroupService:MemberGroupService, 
     private route:ActivatedRoute,private router:Router,private snackBar:MatSnackBar,
     private authService:AuthService,private titleService:TitleService,private matDialog:MatDialog){
  }

  ngOnInit() {
    this.loadPageIfValidRole()
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {
        let memberGroupId=this.route.snapshot.params['id'];
        this.loadMemberGroup(memberGroupId);
        this.loadUsersInGroup(memberGroupId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadMemberGroup(memberGroupId:number)
  {
    this.memberGroupService.getGroupById(memberGroupId).subscribe(group=>{
      this.memberGroup=group;
      this.titleService.changeTitle(group.name+" members")
    })
  }

  loadUsersInGroup(memberGroupId:number) {
    this.appUsersService.getAllUsersInGroup(memberGroupId).subscribe(appUsers => {
      this.dataSource.data=appUsers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  updateMemberGroup(newGroupName:string)
  {
    this.memberGroup.name=newGroupName;
    this.memberGroupService.updateGroup(this.memberGroup).subscribe(response=>{
      this.router.navigate(['/members']);
      this.showSnackbar("Renamed to '"+newGroupName+"'.")
    });
  }

  deleteUser(appUser:AppUser)
   {
     if(confirm("Delete user '"+appUser.name+" "+ appUser.surname+" and all payments and attendances connected?"))
       this.appUsersService.deleteUser(appUser).subscribe(response=>{
         this.loadUsersInGroup(this.memberGroup.id);
         this.showSnackbar("User "+appUser.name+" "+appUser.surname+" deleted.");
       })
  }

  deleteGroup()
  {
    if(confirm("Delete group '"+this.memberGroup.name+"'?")) {
      this.memberGroupService.deleteGroup(this.memberGroup).subscribe(response=>{
        this.showSnackbar("Group "+this.memberGroup.name+" deleted.");
        this.router.navigate(['/members']);
      })
    }
  }

  renameGroup()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data=this.memberGroup.name;
    let dialogRef = this.matDialog.open(AddMemberGroupDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(groupName=>{
      if(groupName)
      {
        this.memberGroup.name=groupName;
        this.updateMemberGroup(groupName);
      }
    })
  }

  viewMemberClick(id:number)
  {
    this.router.navigate(['/members/user/'+id+'/edit']);
  }


  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}