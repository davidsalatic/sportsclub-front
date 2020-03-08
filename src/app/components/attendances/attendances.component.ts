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
import { AttendanceModel } from 'src/app/models/helpers/attendance-model';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AttendanceModel> = new MatTableDataSource();

  displayedColumns = [ 'name','present'];

  trainingSession:TrainingSession;
  memberGroup:MemberGroup;
  attendanceModels:AttendanceModel[] = new Array();
  appUsers:AppUser[];
  

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
      this.appUsers=data;
    })
    this.getAllAttendancesForTraining(trainingId);
  }

  getAllAttendancesForTraining(trainingId:number)
  {
    this.attendanceService.getAllAttendancesForTraining(trainingId).subscribe(data=>{
      let attendances:Attendance[] = data;
      for(let i=0;i<this.appUsers.length;i++)
      {
        let isPresent:boolean=false;
        for(let j=0;j<attendances.length;j++)
        {
          if(this.appUsers[i].id===attendances[i].appUser.id)
          {
            isPresent=true;
            break;
          }
        }
        let attendanceModel : AttendanceModel = new AttendanceModel();
        attendanceModel.appUser=this.appUsers[i];
        if(isPresent)
          attendanceModel.present=true;
        else
          attendanceModel.present=false;
        this.attendanceModels.push(attendanceModel);
      }
      this.dataSource.data=this.attendanceModels;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  presentClick(checked:boolean,attendanceModel:AttendanceModel)
  {
    if(checked)
    {
      let attendance:Attendance= new Attendance();
      attendance.appUser=attendanceModel.appUser;
      attendance.trainingSession=this.trainingSession;
      this.attendanceService.addAttendance(attendance).subscribe(response=>{
        
      })
    }
    else
    {
      this.attendanceService.getByTrainingSessionAndAppUser(this.trainingSession.id,attendanceModel.appUser.id).subscribe(attend=>{
        this.attendanceService.deleteAttendance(attend).subscribe(response=>{

        })
      })
    }
  }
}
