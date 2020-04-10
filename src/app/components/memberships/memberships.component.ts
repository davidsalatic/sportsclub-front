import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Membership } from 'src/app/models/membership';
import { MembershipService } from 'src/app/services/membership-service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ChangeMembershipPriceDialogComponent } from '../dialogs/change-membership-price-dialog/change-membership-price-dialog.component';
import { MembershipPrice } from 'src/app/models/membership-price';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { PeriodService } from 'src/app/services/period-service';
import { Period } from 'src/app/models/period';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})
export class MembershipsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Membership> = new MatTableDataSource();
  defaultMembershipPrice:MembershipPrice;
  displayedColumns = ['month'];

constructor(private membershipService:MembershipService,private matDialog:MatDialog,
  private snackBar:MatSnackBar,private authService:AuthService,private router:Router
  ,private periodService:PeriodService,private titleService:TitleService)
{
  this.titleService.changeTitle("Memberships");
}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isManagerLoggedIn())
      this.loadDefaultPriceAndCreateMembershipIfNotExist();
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadDefaultPriceAndCreateMembershipIfNotExist()
  {
    this.membershipService.getMembershipPrice().subscribe(data=>{
      this.defaultMembershipPrice=data;
      this.createMembershipInPeriodIfNotExists();
  });
  }

  createMembershipInPeriodIfNotExists()
  {
    let today:Date = new Date();
    let currentMonth:number = today.getMonth()+1;
    let currentYear:number = today.getFullYear();

    this.periodService.getPeriodByMonthAndYear(currentMonth,currentYear).subscribe(period=>{
      if(period)
        this.membershipService.getMembershipByPeriod(period.id).subscribe(membership=>{
          if(membership)
            this.loadMemberships();
          else
            this.addMembership(period);
        })
    })
  }

  addMembership(period:Period)
  {
    let membership:Membership = new Membership();
    membership.period=period;
    membership.price=this.defaultMembershipPrice.price;
    this.membershipService.addMembership(membership).subscribe(response=>{
      this.loadMemberships();
    });
  }

  loadMemberships()
  {
    this.membershipService.getAllMemberships().subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  
  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data=this.defaultMembershipPrice.price;
    let dialogRef = this.matDialog.open(ChangeMembershipPriceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(price=>{
      if(price)
        this.setDefaultMembershipPrice(price);
    })
  }

  setDefaultMembershipPrice(price:number)
  {
    this.defaultMembershipPrice.price=price;
    this.membershipService.setMembershipPrice(this.defaultMembershipPrice).subscribe(response=>{
      this.showSnackbar("Default price of membership changed to "+this.defaultMembershipPrice.price+".")
    });
  }

  viewMembershipClick(membership:Membership)
  {
    this.router.navigate(['/memberships/'+membership.id]);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}