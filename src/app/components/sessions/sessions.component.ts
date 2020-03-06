import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberGroup } from 'src/app/models/member-group';
import { MemberGroupService } from 'src/app/services/member-group-service';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})

export class SessionsComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<MemberGroup> = new MatTableDataSource();

  displayedColumns = ['name','actions'];
  currentMonth:number = new Date().getMonth()+1;
  currentYear:number = new Date().getFullYear();

  constructor(private memberGroupService:MemberGroupService){}

  ngOnInit() {
    this.loadGroups();

  }

  loadGroups()
  {
    this.memberGroupService.getAllGroups().subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
