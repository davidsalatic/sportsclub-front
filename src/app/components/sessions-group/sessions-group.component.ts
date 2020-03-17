import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingSession } from 'src/app/models/training-session';
import { TrainingSessionService } from 'src/app/services/training-session-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
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
  memberGroup:MemberGroup;
  terms:Term[];
  allPeriods:Period[];
  periodId:number;
  showAutoGenerateButton=true;

  selectedPeriod: string = '';

  daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(private trainingSessionService: TrainingSessionService,private route:ActivatedRoute
    ,private memberGroupService:MemberGroupService, private matDialog:MatDialog,
    private snackBar:MatSnackBar,private authService:AuthService,private router:Router,
    private termService:TermService,private periodService:PeriodService){}

  ngOnInit() {
    this.loadPageIfValidRole();
    
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && this.roleIsValid(claims))
          {
            let memberGroupId = this.route.snapshot.params['groupId'];
            this.periodId = this.route.snapshot.params['periodId'];
            this.loadAllPeriods();
            this.loadMemberGroupAndTerms(memberGroupId);
            this.loadTrainingSessionsInGroupInPeriod(memberGroupId,this.periodId);
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

  loadAllPeriods()
  {
    this.periodService.getAll().subscribe(periods=>{
      this.allPeriods=periods;
    })
  }

  loadMemberGroupAndTerms(memberGroupId:number)
  {
    this.memberGroupService.getGroupById(memberGroupId).subscribe(group=>{
      this.memberGroup=group;
      this.termService.getAllTermsByMemberGroup(this.memberGroup.id).subscribe(terms=>{
        this.terms=terms;
      })
    })
  }
  
  loadTrainingSessionsInGroupInPeriod(memberGroupId:number,periodId:number)
  {
    this.periodService.getPeriodById(periodId).subscribe(period=>{
      let date:Date = new Date();
      if(period.month!=date.getMonth()+1 || period.year!=date.getFullYear())
        this.showAutoGenerateButton=false;
      else
        this.showAutoGenerateButton=true;
    })
    this.trainingSessionService.getAllTrainingSessionsByGroupByPeriod(memberGroupId,periodId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteTrainingSession(trainingSession:TrainingSession)
  {
    if(confirm("Delete training session and all connected attendances?")) {
      this.trainingSessionService.deleteTrainingSession(trainingSession).subscribe(response=>{
        this.loadTrainingSessionsInGroupInPeriod(this.memberGroup.id,this.periodId);
        this.showSnackbar("Training session deleted.")
      })
    }
  }


  openDialog()
  {
    if(this.terms.length>0)
    {
      const dialogConfig = new MatDialogConfig();
      let dialogRef = this.matDialog.open(AutoGenerateSessionsDialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(day=>{
        if(day)
        {
          this.trainingSessionService.generateTrainingSessionsForTerms(this.terms,this.periodId,day).subscribe(response=>{
            this.loadTrainingSessionsInGroupInPeriod(this.memberGroup.id,this.periodId);
            this.showSnackbar("Training sessions generated.");
          })
        }
      })
    }
    else
      this.showSnackbar("Add terms for group first. [Members page]")
    
  }

  selectChangeHandler (event: any) {
    this.selectedPeriod = event.target.value;
    let periodArray:string[] = this.selectedPeriod.split("-");
    let month = parseInt(periodArray[0]);
    let year = parseInt(periodArray[1]);
    this.periodService.getPeriodByMonthAndYear(month,year).subscribe(period=>{

      this.router.navigate(['/sessions/group/'+this.memberGroup.id+'/period/'+period.id])
      this.periodId=period.id;
      this.loadTrainingSessionsInGroupInPeriod(this.memberGroup.id,period.id)
    })
  }

  deleteAll()
  {
    if(confirm("Delete all training sessions for this month? All attendances will be lost.")) {
      this.trainingSessionService.deleteTrainingSessionsInGroupInPeriod(this.memberGroup.id,this.periodId).subscribe(response=>{
        this.loadTrainingSessionsInGroupInPeriod(this.memberGroup.id,this.periodId);
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
