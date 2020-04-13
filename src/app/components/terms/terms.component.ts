import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Term } from 'src/app/models/term';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { TermService } from 'src/app/services/term-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { TitleService } from 'src/app/services/title-service';
import { MemberGroup } from 'src/app/models/member-group';

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

  displayedColumns = ['day','time'];

  memberGroupId:number;
  memberGroup:MemberGroup;

  constructor(private authService:AuthService,private route:ActivatedRoute,private titleService:TitleService,
    private router:Router,private termService:TermService,private snackBar:MatSnackBar,
    private memberGroupService:MemberGroupService
    ){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {
        this.memberGroupId=this.route.snapshot.params['groupId'];
        this.loadMemberGroup(this.memberGroupId);
        this.loadTermsInGroup(this.memberGroupId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadMemberGroup(memberGroupId:number){
    this.memberGroupService.getGroupById(memberGroupId).subscribe(group=>{
      this.titleService.changeTitle(group.name+" terms");
      this.memberGroup=group;
    })
  }

  loadTermsInGroup(memberGroupId:number)
  {
    this.termService.getAllTermsByMemberGroup(memberGroupId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewTermClick(termId:number)
  {
    this.router.navigate(['/terms/'+termId]);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
