import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionApplicationService } from 'src/app/services/competition-application-service';
import { CompetitionApplication } from 'src/app/models/competition-application';
import { CompetitionService } from 'src/app/services/competition-service';
import { Competition } from 'src/app/models/competition';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-applied-users-competition',
  templateUrl: './applied-users-competition.component.html',
  styleUrls: ['./applied-users-competition.component.css']
})
export class AppliedUsersCompetitionComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<CompetitionApplication> = new MatTableDataSource();

  competition:Competition;

  displayedColumns = ['group','name','phone'];

  constructor(private authService:AuthService,private router:Router,private route:ActivatedRoute
    ,private competitionApplicationService:CompetitionApplicationService,
    private competitionService:CompetitionService,private titleService:TitleService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {
        let competitionId:number = this.route.snapshot.params['id']; 
        this.loadCompetition(competitionId);
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

  loadCompetition(competitionId:number)
  {
    this.competitionService.getCompetitionById(competitionId).subscribe(comp=>{
      this.competition=comp;
      this.titleService.changeTitle("Applied users for "+this.competition.name);
    })
  }
}
