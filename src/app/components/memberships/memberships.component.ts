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
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
import { PeriodService } from 'src/app/services/period-service';
import { Period } from 'src/app/models/period';

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

  displayedColumns = ['month','actions'];

constructor(private membershipService:MembershipService,private matDialog:MatDialog,
  private snackBar:MatSnackBar,private authService:AuthService,private router:Router
  ,private periodService:PeriodService)
{}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && this.roleIsValid(claims))
            this.loadDefaultMembershipPriceAndCreateMembershipIfNotExist();
        else
          this.router.navigate(['home']);
      })
    })
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role===Roles.MANAGER
  }

  loadDefaultMembershipPriceAndCreateMembershipIfNotExist()
  {
    this.membershipService.getMembershipPrice().subscribe(data=>{
      this.defaultMembershipPrice=data;
      this.createMembershipForCurrentMonthAndLoadAll();
  });
  }


  createMembershipForCurrentMonthAndLoadAll() {
    let date=new Date();
    let currentMonth = date.getMonth()+1;
    let currentYear = date.getFullYear();
    
    this.periodService.getPeriodByMonthAndYear(currentMonth,currentYear).subscribe(period=>{
      if(period)
        this.loadMemberships();
      else
      {
        let period:Period = new Period();
        period.month=currentMonth;
        period.year=currentYear;
        this.periodService.addPeriod(period).subscribe(response=>{
          this.periodService.getPeriodByMonthAndYear(currentMonth,currentYear).subscribe(newPeriod=>{
            this.addMembership(newPeriod);
          })
        })
      }
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
      this.loadMemberships();
      this.showSnackbar("Default price of membership changed to "+this.defaultMembershipPrice.price+".")
    });
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}