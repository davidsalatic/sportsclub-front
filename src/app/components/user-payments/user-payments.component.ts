import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Payment } from 'src/app/models/payment';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
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
    let token:string = sessionStorage.getItem('user');
    if(token)
    this.authService.extractClaims(token).subscribe(claims=>{
      if(this.roleIsValid(claims))
      {
        let appUserId = this.activatedRoute.snapshot.params['appUserId'];
        this.loadPaymentsForUser(appUserId);
      }
      else
        this.router.navigate(['home']);
    })
    else
      this.router.navigate(['login']);
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role.name===Roles.COACH || claims.role.name===Roles.MANAGER || claims.role.name===Roles.MEMBER;
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
