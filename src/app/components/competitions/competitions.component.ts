import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {  MatTableDataSource } from '@angular/material/table';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition-service';
import { AuthService } from 'src/app/services/auth-service';
import { ThrowStmt } from '@angular/compiler';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompetitionApplicationService } from 'src/app/services/competition-application-service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Competition> = new MatTableDataSource();

  displayedColumns = ['name','location','dateHeld','timeHeld','actions'];

  loggedInRole :string;

  constructor(private competitionService:CompetitionService,private authService:AuthService,
    private router:Router,private snackBar:MatSnackBar,private competitionApplicationService:CompetitionApplicationService){}

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

  sendInvitations(competition:Competition)
  {
    if(confirm("This will send an email to ALL members!")) {
      this.competitionService.sendInvitations(competition).subscribe()
      {
        this.showSnackbar("Email invitations sent.");
      }
    }
  }

  deleteCompetition(competition:Competition)
  {
    if(confirm("Delete competition '"+competition.name+"'?")) {
      this.competitionService.deleteCompetition(competition.id).subscribe(response=>{
        this.loadCompetitions();
        this.showSnackbar("Competition "+competition.name+" deleted.")
      })
    }
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
