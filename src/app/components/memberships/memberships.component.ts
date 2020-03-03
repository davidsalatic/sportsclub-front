import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Membership } from 'src/app/models/membership';
import { MembershipService } from 'src/app/services/membership-service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ChangeMembershipPriceDialogComponent } from '../dialogs/change-membership-price-dialog/change-membership-price-dialog.component';
import { MembershipPrice } from 'src/app/models/membership-price';

@Component({
  selector: 'app-memberships',
  templateUrl: './memberships.component.html',
  styleUrls: ['./memberships.component.css']
})
export class MembershipsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Membership> = new MatTableDataSource();

  membershipPrice:MembershipPrice;

  displayedColumns = ['month','actions'];

constructor(private membershipService:MembershipService,private matDialog:MatDialog)
{

}

  ngOnInit() {
    this.membershipService.getMembershipPrice().subscribe(data=>{
        this.membershipPrice=data;
        this.createMembershipForCurrentMonthAndLoadAll();
    });
  }

  createMembershipForCurrentMonthAndLoadAll() {
    let date=new Date();
    let currentMonth = date.getMonth()+1;
    let currentYear = date.getFullYear();
    this.membershipService.getAllByMonthAndYear(currentMonth,currentYear).subscribe(data=>{
      //IF THERE ISN'T A MEMBERSHIP CREATED IN THIS MONTH, CREATE ONE
      if(!data)
      {
        let membership:Membership = new Membership();
        membership.month=date.getMonth()+1;
        membership.year=date.getFullYear();
        membership.price=this.membershipPrice.price;
        this.membershipService.addMembership(membership).subscribe(response=>{
          this.loadMemberships();
        });
      }
      else
        this.loadMemberships();
    })
  }
  
  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(ChangeMembershipPriceDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(price=>{
      if(price)
      {
        this.membershipPrice.price=price;
        this.membershipService.setMembershipPrice(this.membershipPrice).subscribe(response=>{
          this.loadMemberships();
        });
      }
    })
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
