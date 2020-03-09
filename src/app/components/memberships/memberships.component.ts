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

constructor(private membershipService:MembershipService,private matDialog:MatDialog,private snackBar:MatSnackBar)
{}

  ngOnInit() {
    this.loadDefaultMembershipPrice();
    this.createMembershipForCurrentMonthAndLoadAll();
  }

  loadDefaultMembershipPrice()
  {
    this.membershipService.getMembershipPrice().subscribe(data=>{
      this.defaultMembershipPrice=data;
  });
  }


  createMembershipForCurrentMonthAndLoadAll() {
    let date=new Date();
    let currentMonth = date.getMonth()+1;
    let currentYear = date.getFullYear();
    this.membershipService.getAllByMonthAndYear(currentMonth,currentYear).subscribe(memberships=>{
      //IF THERE ISN'T A MEMBERSHIP IN THIS MONTH, CREATE ONE
      if(!memberships)
        this.addMembership(currentMonth,currentYear);
      else
        this.loadMemberships();
    })
  }

  addMembership(month:number,year:number)
  {
    let membership:Membership = new Membership();
    membership.month=month;
    membership.year=year;
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