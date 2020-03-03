import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment-service';
import { ActivatedRoute } from '@angular/router';
import { MembershipService } from 'src/app/services/membership-service';
import { Membership } from 'src/app/models/membership';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';

@Component({
  selector: 'app-payments-for-membership-by-app-user',
  templateUrl: './payments-for-membership-by-app-user.component.html',
  styleUrls: ['./payments-for-membership-by-app-user.component.css']
})
export class PaymentsForMembershipByAppUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Payment> = new MatTableDataSource();

  displayedColumns = [ 'date','amount','actions'];

  membership:Membership;
  appUser:AppUser;
  total:number=0;

  constructor(private paymentService:PaymentService,private membershipService:MembershipService,
    private appUserService:AppUserService, private route:ActivatedRoute){}

  ngOnInit() {
    let membershipId=this.route.snapshot.params['membershipId'];
    let appUserId = this.route.snapshot.params['appUserId'];
    this.membershipService.getMembershipById(membershipId).subscribe(data=>{
      this.membership=data;
      this.appUserService.getUserById(appUserId).subscribe(data=>{
        this.appUser=data;
      })
    })
    this.loadPayments(membershipId,appUserId);

  }

  loadPayments(membershipId:number,appUserId:number)
  {
    this.paymentService.getAllPaymentsForMembershipByUser(membershipId,appUserId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total=0;
      for(let payment of data)
      {
        this.total+=payment.amount
      }
    })
  }
}
