import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Membership } from 'src/app/models/membership';
import { MembershipService } from 'src/app/services/membership-service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})
export class MembershipsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Membership> = new MatTableDataSource();

  displayedColumns = ['id', 'month','actions'];

constructor(private membershipService:MembershipService)
{

}

  ngOnInit() {
    this.loadMemberships();
  }

  loadMemberships()
  {
    this.membershipService.getAllMemberships().subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
