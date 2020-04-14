import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition-service';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Competition> = new MatTableDataSource();

  displayedColumns = ['dateHeld','name','location','timeHeld'];

  loggedInRole :string;

  constructor(private competitionService:CompetitionService,private authService:AuthService,
    private router:Router,private snackBar:MatSnackBar,private titleService:TitleService){
      this.titleService.changeTitle("Competitions");
    }

  ngOnInit() {
    this.loadPageIfLoggedIn();
  }

  loadPageIfLoggedIn()
  {
    if(this.authService.getToken())
    {
      this.loggedInRole=this.authService.getLoggedInRole();
      this.loadCompetitions();
    }
    else
      this.router.navigate(['login']);
  }

  loadCompetitions()
  {
    this.competitionService.getAllCompetitions().subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  viewCompetitionClick(competitionId:number)
  {
    this.router.navigate(['competitions/'+competitionId+"/edit"]);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
