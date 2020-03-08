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
  membership:Membership;
  

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
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
      
    })
  }
}
