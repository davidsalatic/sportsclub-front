import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeMembershipPriceDialogComponent } from '../dialogs/change-membership-price-dialog/change-membership-price-dialog.component';
import { MembershipService } from 'src/app/services/membership-service';
import { Membership } from 'src/app/models/membership';
import { Payment } from 'src/app/models/payment';
import { AppUserCondition } from 'src/app/models/helpers/user-condition';
import { AuthService } from 'src/app/services/auth-service';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-app-users-in-membership',
  templateUrl: './app-users-in-membership.component.html',
  styleUrls: ['./app-users-in-membership.component.css']
})
export class AppUsersInMembershipComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUserCondition>= new MatTableDataSource();

  membership:Membership;
  appUsers:AppUser[];
  usersWithCondition:AppUserCondition[]= new Array();
  membershipId:number;
  displayedColumns = [ 'name','group','settled'];
  
  constructor(private route:ActivatedRoute, private appUserService : AppUserService,
    private paymentService:PaymentService,private matDialog:MatDialog,private titleService:TitleService,
    private membershipService:MembershipService,private router:Router,private authService:AuthService)
  {}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isManagerLoggedIn())
      {
        this.membershipId=this.route.snapshot.params['id'];
        this.loadMembership(this.membershipId);
        this.loadAppUsersAndPayments();
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadMembership(membershipId:number)
  {
    this.membershipService.getMembershipById(membershipId).subscribe(membership=>{
      this.membership=membership;
      this.titleService.changeTitle("Membership "+membership.period.month+"-"+membership.period.year);
    })
  }

  loadAppUsersAndPayments()
  {
    this.appUserService.getAllMembers().subscribe(users=>{
      this.appUsers=users;
      this.loadAllPaymentsForMembership();
    })
  }

  loadAllPaymentsForMembership()
  {
    this.paymentService.getAllPaymentsForMembership(this.membershipId).subscribe(paymentsForMembership=>{
      for(let i=0;i<this.appUsers.length;i++)
      {
        let totalAmount=0;
        for(let j=0;j<paymentsForMembership.length;j++)
        {
          if(this.paymentFoundForUser(this.appUsers[i],paymentsForMembership[j]))
            totalAmount+=paymentsForMembership[j].amount;
        }
        this.createNewUserWithConditionForTable(this.appUsers[i],totalAmount);
      }
      this.dataSource.data=this.usersWithCondition;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  paymentFoundForUser(appUser:AppUser,payment:Payment)
  {
    return appUser.id===payment.appUser.id;
  }

  createNewUserWithConditionForTable(appUser:AppUser,totalAmount:number)
  {
    let appUserCondition:AppUserCondition = new AppUserCondition();
    appUserCondition.appUser=appUser;
    if(totalAmount>=this.membership.price)
      appUserCondition.condition=true;//total payments settled the membership debt
    else
      appUserCondition.condition=false;//total payments of user are not enough for membership debt
    this.usersWithCondition.push(appUserCondition);
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=this.membership.price;
    let dialogRef = this.matDialog.open(ChangeMembershipPriceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(price=>{
      if(price)
        this.changeThisMembershipPrice(price);
    })
  }

  changeThisMembershipPrice(price:number)
  {
    this.membership.price=price;
    this.membershipService.updateMembership(this.membership).subscribe(response=>{
      //empties the array on the UI, then populates it again with refreshed data
      this.usersWithCondition.length=0;
      this.loadAppUsersAndPayments();
    })
  }

  viewPaymentsClick(appUserCondition:AppUserCondition)
  {
    this.router.navigate(['/payments/membership/'+this.membership.id+
    "/user/"+appUserCondition.appUser.id]);
  }
}
