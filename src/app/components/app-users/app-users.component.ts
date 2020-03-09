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

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  displayedColumns = ['name','actions'];
  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  memberGroup: MemberGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private appUsersService:AppUserService,private memberGroupService:MemberGroupService, 
     private route:ActivatedRoute,private router:Router,private snackBar:MatSnackBar){
  }

  ngOnInit() {
    let memberGroupId=this.route.snapshot.params['id'];
    this.loadMemberGroup(memberGroupId);
    this.loadUsersInGroup(memberGroupId)
  }

  loadMemberGroup(memberGroupId:number)
  {
    this.memberGroupService.getGroupById(memberGroupId).subscribe(memberGroup=>{
      this.memberGroup=memberGroup;
    })
  }

  loadUsersInGroup(memberGroupId:number) {
    this.appUsersService.getAllUsersInGroup(memberGroupId).subscribe(appUsers => {
      this.dataSource.data=appUsers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  rename(newGroupName: string)
  {
    if(newGroupName)
      this.updateMemberGroup(newGroupName);
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
         this.showSnackbar("User" +appUser.name+" "+appUser.surname+" deleted.");
       })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}