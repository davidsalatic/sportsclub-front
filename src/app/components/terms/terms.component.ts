import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Term } from 'src/app/models/term';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
import { TermService } from 'src/app/services/term-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberGroupService } from 'src/app/services/member-group-service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<Term> = new MatTableDataSource();

  daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  displayedColumns = ['day','time','actions'];

  memberGroupId:number;

  constructor(private authService:AuthService,private route:ActivatedRoute,
    private router:Router,private termService:TermService,private snackBar:MatSnackBar,
    private memberGroupService:MemberGroupService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && this.roleIsValid(claims))
        {
          this.memberGroupId=this.route.snapshot.params['groupId'];
          this.loadTermsInGroup(this.memberGroupId);
        }
        else
          this.router.navigate(['home']);
      })
    })
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role===Roles.COACH || claims.role===Roles.MANAGER
  }

  loadTermsInGroup(memberGroupId:number)
  {
    this.termService.getAllTermsByMemberGroup(memberGroupId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteTerm(term:Term)
  {
    if(confirm("Delete term on '"+this.daysOfWeek[term.dayOfWeek]+" "+ term.startTime))
    this.termService.deleteTerm(term).subscribe(response=>{
      this.loadTermsInGroup(this.memberGroupId);
      this.showSnackbar("Term deleted.");
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
