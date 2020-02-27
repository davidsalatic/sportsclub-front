import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberGroup } from '../models/member-group';
import { MemberGroupService } from '../services/member-group-service';

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

  constructor(public memberGroupService:MemberGroupService)
  {
  }

  ngOnInit() {
    this.memberGroupService.getAllGroups().subscribe(data => {
      this.dataSource.data=data;
      console.log("ng on init started");
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  addGroup(groupName:string)
  {
    let memberGroup = new MemberGroup();
    memberGroup.name=groupName;
    this.memberGroupService.addGroup(memberGroup);
    location.reload();
  }
}