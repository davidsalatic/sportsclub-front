import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-app-users',
  templateUrl: './app-users.component.html',
  styleUrls: ['./app-users.component.css']
})
export class AppUsersComponent implements OnInit {

  displayedColumns = ['id', 'name','surname'];
  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(){}


  ngOnInit() {
    this.loadUsersInGroup();
  }
  loadUsersInGroup() {
    throw new Error("Method not implemented.");
  }
}
