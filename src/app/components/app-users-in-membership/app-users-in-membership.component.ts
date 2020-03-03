import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment-service';

@Component({
  selector: 'app-app-users-in-membership',
  templateUrl: './app-users-in-membership.component.html',
  styleUrls: ['./app-users-in-membership.component.css']
})
export class AppUsersInMembershipComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUser>= new MatTableDataSource();
  idPathVariable:number;

  constructor(private route:ActivatedRoute, private appUserService : AppUserService,private paymentService:PaymentService)
  {

  }

  displayedColumns = [ 'name','group','actions'];

  ngOnInit() {
    this.idPathVariable=this.route.snapshot.params['id'];
    this.loadAppUsers();
  }

  loadAppUsers()
  {
    this.appUserService.getAllUsers().subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
