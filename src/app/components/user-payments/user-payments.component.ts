import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/payment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { PaymentService } from 'src/app/services/payment-service';

@Component({
  selector: 'app-user-payments',
  templateUrl: './user-payments.component.html',
  styleUrls: ['./user-payments.component.css']
})
export class UserPaymentsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<Payment> = new MatTableDataSource();

  displayedColumns = ['date','amount','membership'];

  constructor(private authService:AuthService,private activatedRoute:ActivatedRoute,
    private router:Router,private paymentService:PaymentService){}

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    {
      let appUserId = this.activatedRoute.snapshot.params['appUserId'];
      this.loadPaymentsForUser(appUserId);
    }
    else
      this.router.navigate(['login']);
  }


  loadPaymentsForUser(appUserId:number)
  {
    this.paymentService.getAllPaymentsByAppUser(appUserId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
    })
  }
}
