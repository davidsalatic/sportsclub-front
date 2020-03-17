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

  constructor(private trainingSessionService: TrainingSessionService,private route:ActivatedRoute
    ,private memberGroupService:MemberGroupService, private matDialog:MatDialog,
    private snackBar:MatSnackBar,private authService:AuthService,private router:Router,
    private termService:TermService){}

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
            this.loadMemberGroupAndTerms(memberGroupId);
            this.loadTrainingSessionsInGroup(memberGroupId);
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

  loadMemberGroupAndTerms(memberGroupId:number)
  {
    this.memberGroupService.getGroupById(memberGroupId).subscribe(group=>{
      this.memberGroup=group;
      this.termService.getAllTermsByMemberGroup(this.memberGroup.id).subscribe(terms=>{
        this.terms=terms;
      })
    })
  }
  
  loadTrainingSessionsInGroup(memberGroupId:number)
  {
    this.trainingSessionService.getAllTrainingSessionsByGroup(memberGroupId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteTrainingSession(trainingSession:TrainingSession)
  {
    if(confirm("Delete training session and all connected attendances?")) {
      this.trainingSessionService.deleteTrainingSession(trainingSession).subscribe(response=>{
        this.loadTrainingSessionsInGroup(this.memberGroup.id);
        this.showSnackbar("Training session deleted.")
      })
    }
  }


  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AutoGenerateSessionsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(day=>{
      if(day)
      {
        this.trainingSessionService.generateTrainingSessionsForTerms(this.terms,day).subscribe(response=>{
          this.loadTrainingSessionsInGroup(this.memberGroup.id);
        })
      }
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
