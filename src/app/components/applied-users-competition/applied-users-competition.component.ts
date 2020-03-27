import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { AppUser } from 'src/app/models/app-user';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionApplicationService } from 'src/app/services/competition-application-service';
import { CompetitionApplication } from 'src/app/models/competition-application';

@Component({
  selector: 'app-applied-users-competition',
  templateUrl: './applied-users-competition.component.html',
  styleUrls: ['./applied-users-competition.component.css']
})
export class AppliedUsersCompetitionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<CompetitionApplication> = new MatTableDataSource();

  displayedColumns = ['name','group','phone'];

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute
    ,private competitionApplicationService:CompetitionApplicationService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {
        let competitionId:number = this.route.snapshot.params['id']; 
        this.competitionApplicationService.getAllByCompetition(competitionId).subscribe(data=>{
          this.dataSource.data=data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        })
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }
}
