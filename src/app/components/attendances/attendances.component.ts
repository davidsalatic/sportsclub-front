import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';
import { TrainingSessionService } from 'src/app/services/training-session-service';
import { TrainingSession } from 'src/app/models/training-session';
import { ActivatedRoute } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { AppUser } from 'src/app/models/app-user';
import { AttendanceService } from 'src/app/services/attendance-service';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUser> = new MatTableDataSource();

  displayedColumns = [ 'name','present'];

  trainingSession:TrainingSession;
  memberGroup:MemberGroup;
  attendances:Attendance[];

  constructor(private route:ActivatedRoute,private appUserService:AppUserService
    ,private attendanceService:AttendanceService,
    private trainingSessionService:TrainingSessionService,private memberGroupService:MemberGroupService)
  {}

  ngOnInit() {
    let trainingId=this.route.snapshot.params['id'];
    let memberGroupId = this.route.snapshot.params['groupId'];

    this.trainingSessionService.getById(trainingId).subscribe(training=>{
      this.trainingSession=training;
      this.memberGroupService.getGroupById(memberGroupId).subscribe(group=>{
        this.memberGroup=group;
        
      })
    })
    this.appUserService.getAllUsersInGroup(memberGroupId)
    .subscribe( data => {
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    this.getAllAttendancesForTraining(trainingId);
  }

  getAllAttendancesForTraining(trainingId:number)
  {
    this.attendanceService.getAllAttendancesForTraining(trainingId).subscribe(attendances=>{
      this.attendances=attendances;
    })
  }

  presentClick(checked:boolean,appUser:AppUser)
  {
    if(checked)
    {
      let attendance:Attendance= new Attendance();
      attendance.appUser=appUser;
      attendance.trainingSession=this.trainingSession;
      this.attendanceService.addAttendance(attendance).subscribe(response=>{
        
      })
    }
    else
    {
      this.attendanceService.getByTrainingSessionAndAppUser(this.trainingSession.id,appUser.id).subscribe(attend=>{
        this.attendanceService.deleteAttendance(attend).subscribe(response=>{

        })
      })
    }
  }

  isPresent(appUser:AppUser)
  { 
    for(let attendance of this.attendances)
    {
      if(attendance.appUser.id===appUser.id && attendance.trainingSession.id===this.trainingSession.id)
      {
        return true;
      }
    }
    return false;
  }
}
