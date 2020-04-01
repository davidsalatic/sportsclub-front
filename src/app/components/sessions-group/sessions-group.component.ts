import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingSession } from 'src/app/models/training-session';
import { TrainingSessionService } from 'src/app/services/training-session-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { Term } from 'src/app/models/term';
import { AutoGenerateSessionsDialogComponent } from '../dialogs/auto-generate-sessions-dialog/auto-generate-sessions-dialog.component';
import { TermService } from 'src/app/services/term-service';
import { PeriodService } from 'src/app/services/period-service';
import { Period } from 'src/app/models/period';


@Component({
  selector: 'app-sessions-group',
  templateUrl: './sessions-group.component.html',
  styleUrls: ['./sessions-group.component.css']
})
export class SessionsGroupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<TrainingSession>= new MatTableDataSource();
  displayedColumns = ['date','time','actions'];
  memberGroupId:number;
  terms:Term[];
  allPeriods:Period[];
  periodId:number;
  showAutoGenerateButton=true;

  selectedPeriod: string = '';

  daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(private trainingSessionService: TrainingSessionService,private route:ActivatedRoute
    ,private matDialog:MatDialog,
    private snackBar:MatSnackBar,private authService:AuthService,private router:Router,
    private termService:TermService,private periodService:PeriodService){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {
        this.memberGroupId = this.route.snapshot.params['groupId'];
        this.periodId = this.route.snapshot.params['periodId'];
        this.loadAllPeriods();
        this.loadAllTermsInGroup();
        this.loadTrainingSessionsInGroupInPeriod(this.memberGroupId,this.periodId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadAllPeriods()
  {
    this.periodService.getAll().subscribe(periods=>{
      this.allPeriods=periods;
    })
  }

  loadAllTermsInGroup()
  {
    this.termService.getAllTermsByMemberGroup(this.memberGroupId).subscribe(terms=>{
      this.terms=terms;
    })
  }
  
  loadTrainingSessionsInGroupInPeriod(memberGroupId:number,periodId:number)
  {
    this.setAutoGenerateButtonVisibility(periodId);

    this.trainingSessionService.getAllTrainingSessionsByGroupByPeriod(memberGroupId,periodId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  setAutoGenerateButtonVisibility(periodId:number)
  {
    this.periodService.getPeriodById(periodId).subscribe(period=>{
      if(this.periodIsCurrentMonth(period))
        this.showAutoGenerateButton=true;
      else
        this.showAutoGenerateButton=false;
    })
  }

  periodIsCurrentMonth(period:Period):boolean
  {
    let date:Date = new Date();
    let currentMonth = date.getMonth()+1;
    let currentYear = date.getFullYear();
    return period.month==currentMonth && period.year==currentYear;
  }

  deleteTrainingSession(trainingSession:TrainingSession)
  {
    if(confirm("Delete training session and all connected attendances?")) {
      this.trainingSessionService.deleteTrainingSession(trainingSession).subscribe(()=>{
        this.loadTrainingSessionsInGroupInPeriod(this.memberGroupId,this.periodId);
        this.showSnackbar("Training session deleted.")
      })
    }
  }

  openDialog()
  {
    if(this.memberGroupHasTerms())
    {
      const dialogConfig = new MatDialogConfig();
      let dialogRef = this.matDialog.open(AutoGenerateSessionsDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(day=>{
        if(day)
          this.trainingSessionService.generateTrainingSessionsForTerms(this.terms,this.periodId,day).subscribe(()=>{
            this.loadTrainingSessionsInGroupInPeriod(this.memberGroupId,this.periodId);
            this.showSnackbar("Training sessions generated.");
          })
      })
    }
    else
      this.showSnackbar("Add terms for group first. [Members page]")
    
  }

  memberGroupHasTerms():boolean
  {
    return this.terms.length>0;
  }

  periodSelected (event: any) {
    if(event.target.value)
    {
      this.selectedPeriod = event.target.value;
      let periodArray:string[] = this.selectedPeriod.split("-");
      let month = parseInt(periodArray[0]);
      let year = parseInt(periodArray[1]);
      this.periodService.getPeriodByMonthAndYear(month,year).subscribe(period=>{
        this.router.navigate(['/sessions/group/'+this.memberGroupId+'/period/'+period.id])
        this.periodId=period.id;
        this.loadTrainingSessionsInGroupInPeriod(this.memberGroupId,period.id)
      })
    }
  }

  deleteAll()
  {
    if(confirm("Delete all training sessions for this month? All attendances will be lost.")) {
      this.trainingSessionService.deleteTrainingSessionsInGroupInPeriod(this.memberGroupId,this.periodId).subscribe(()=>{
        this.loadTrainingSessionsInGroupInPeriod(this.memberGroupId,this.periodId);
      })
    } 
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 2500
    })
  }
}