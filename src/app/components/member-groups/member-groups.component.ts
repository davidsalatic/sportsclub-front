import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberGroup } from '../models/member-group';
import { MemberGroupService } from '../services/member-group-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddMemberGroupDialogComponent } from '../add-member-group-dialog/add-member-group-dialog.component';
import { group } from '@angular/animations';

@Component({
  selector: 'app-member-groups',
  templateUrl: './member-groups.component.html',
  styleUrls: ['./member-groups.component.css']
})
export class MemberGroupsComponent implements OnInit {

  displayedColumns = ['id', 'name','actions'];
  dataSource: MatTableDataSource<MemberGroup> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private memberGroupService:MemberGroupService, private matDialog:MatDialog)
  {
  }

  ngOnInit() {
    this.loadGroups();
  }

  loadGroups()
  {
    this.memberGroupService.getAllGroups().subscribe(data => {
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addGroup(groupName:string)
  {
    if(groupName.trim().length>0)
    {
      let memberGroup = new MemberGroup();
      memberGroup.name=groupName;
      this.memberGroupService.addGroup(memberGroup).subscribe(response=>{
        this.loadGroups();
      });   
    }
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AddMemberGroupDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(groupName=>{
      this.addGroup(groupName)
    })
  }
}