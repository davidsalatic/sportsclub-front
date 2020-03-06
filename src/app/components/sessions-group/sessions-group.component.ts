import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingSession } from 'src/app/models/training-session';
import { TrainingSessionService } from 'src/app/services/training-session-service';
import { ActivatedRoute } from '@angular/router';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddTrainingSessionDialogComponent } from '../dialogs/add-training-session-dialog/add-training-session-dialog.component';

@Component({
  selector: 'app-sessions-group',
  templateUrl: './sessions-group.component.html',
  styleUrls: ['./sessions-group.component.css']
})
export class SessionsGroupComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<TrainingSession>= new MatTableDataSource();

  displayedColumns = ['date','actions'];

  constructor(private trainingSessionService: TrainingSessionService,private route:ActivatedRoute
    ,private memberGroupService:MemberGroupService, private matDialog:MatDialog){}

  month:number;
  year:number;
  memberGroup:MemberGroup;

  ngOnInit() {
    this.month=this.route.snapshot.params['month'];
    this.year=this.route.snapshot.params['year'];
    let memberGroupId = this.route.snapshot.params['groupId'];
    this.memberGroupService.getGroupById(memberGroupId).subscribe(group=>{
      this.memberGroup=group;
      this.loadTrainingSessionsInGroup();
    })
  }
  
  loadTrainingSessionsInGroup()
  {
    this.trainingSessionService.getAllTrainingSessionsByGroup(this.memberGroup.id).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AddTrainingSessionDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(date=>{
      if(date)
      {
        let trainingSession : TrainingSession = new TrainingSession();
        trainingSession.dateHeld=date;
        trainingSession.memberGroup=this.memberGroup;
        this.trainingSessionService.addTrainingSession(trainingSession).subscribe(response=>{
          this.loadTrainingSessionsInGroup();
        })
      }
    })
  }
}
