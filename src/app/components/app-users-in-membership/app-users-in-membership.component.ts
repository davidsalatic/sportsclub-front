import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AppUserService } from 'src/app/services/app-user-service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangeMembershipPriceDialogComponent } from '../dialogs/change-membership-price-dialog/change-membership-price-dialog.component';
import { MembershipService } from 'src/app/services/membership-service';
import { Membership } from 'src/app/models/membership';
import { Payment } from 'src/app/models/payment';
import { AppUserCondition } from 'src/app/models/helpers/user-condition';

@Component({
  selector: 'app-app-users-in-membership',
  templateUrl: './app-users-in-membership.component.html',
  styleUrls: ['./app-users-in-membership.component.css']
})
export class AppUsersInMembershipComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUserCondition>= new MatTableDataSource();
  idPathVariable:number;
  membership:Membership;
  appUsers:AppUser[];
  payments:AppUserCondition[]= new Array();

  displayedColumns = [ 'name','group','settled','actions'];
  

  constructor(private route:ActivatedRoute, private appUserService : AppUserService,
    private paymentService:PaymentService,private matDialog:MatDialog,private membershipService:MembershipService)
  {

  }

  ngOnInit() {
    this.idPathVariable=this.route.snapshot.params['id'];
    this.membershipService.getMembershipById(this.idPathVariable).subscribe(membership=>{
      this.membership=membership;
      this.loadAppUsers();
    })
  }

  loadAppUsers()
  {
    this.appUserService.getAllMembers().subscribe(data=>{
      this.appUsers=data;
      
      this.paymentService.getAllPaymentsForMembership(this.membership.id).subscribe(data=>{
        let paymentsForMembership:Payment[] = data;

        for(let i=0;i<this.appUsers.length;i++)
        {
          let total=0;
          for(let j=0;j<paymentsForMembership.length;j++)
          {
            if(this.appUsers[i].id===paymentsForMembership[j].appUser.id)
            {
              total+=paymentsForMembership[j].amount;
            }
          }
          let appUserCondition:AppUserCondition = new AppUserCondition();
          appUserCondition.appUser=this.appUsers[i];
          if(total>=this.membership.price)
            appUserCondition.condition=true;//total payments settled the membership debt
          else
            appUserCondition.condition=false;//total payments of user are not enough for membership debt
          this.payments.push(appUserCondition);
        }
        this.dataSource.data=this.payments;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=this.membership.price;
    let dialogRef = this.matDialog.open(ChangeMembershipPriceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(price=>{
      if(price)
      {
        this.changeThisMembershipPrice(price);
      }
    })
  }

  changeThisMembershipPrice(price:number)
  {
    this.membership.price=price;
    this.membershipService.updateMembership(this.membership).subscribe(response=>{
      //LOAD USERS AGAIN!
      //TODO
    })
  }
}
