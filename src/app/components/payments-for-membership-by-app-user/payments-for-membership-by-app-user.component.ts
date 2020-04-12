import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MembershipService } from 'src/app/services/membership-service';
import { Membership } from 'src/app/models/membership';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-payments-for-membership-by-app-user',
  templateUrl: './payments-for-membership-by-app-user.component.html',
  styleUrls: ['./payments-for-membership-by-app-user.component.css']
})
export class PaymentsForMembershipByAppUserComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Payment> = new MatTableDataSource();

  displayedColumns = [ 'date','amount'];

  membership:Membership;
  appUser:AppUser;
  total:number=0;

  constructor(private paymentService:PaymentService,private membershipService:MembershipService,
    private appUserService:AppUserService, private route:ActivatedRoute,private titleService:TitleService,
    private snackBar:MatSnackBar,private authService:AuthService,private router:Router){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isManagerLoggedIn())
      {
        let membershipId=this.route.snapshot.params['membershipId'];
        let appUserId = this.route.snapshot.params['appUserId'];
        this.loadMembershipAndAppUser(membershipId,appUserId);
        this.loadPayments(membershipId,appUserId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadMembershipAndAppUser(membershipId:number,appUserId:number)
  {
    this.membershipService.getMembershipById(membershipId).subscribe(membership=>{
      this.membership=membership;
      this.loadAppUser(appUserId);
    })
  }

  loadAppUser(appUserId:number)
  {
    this.appUserService.getUserById(appUserId).subscribe(appUser=>{
      this.appUser=appUser;
      this.titleService.changeTitle(appUser.name+" "+appUser.surname+" - Payments for "+this.membership.period.month+"-"+this.membership.period.year)
    })
  }

  loadPayments(membershipId:number,appUserId:number)
  {
    this.paymentService.getAllPaymentsForMembershipByUser(membershipId,appUserId).subscribe(payments=>{
      this.dataSource.data=payments;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.generateTotalAmount(payments);
    })
  }

  generateTotalAmount(payments:Payment[])
  {
    this.total=0;
    for(let payment of payments)
    {
      this.total+=payment.amount
    }
  }
  
  viewPaymentClick(payment:Payment)
  {
    this.router.navigate(['/payments/'+payment.id]);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
