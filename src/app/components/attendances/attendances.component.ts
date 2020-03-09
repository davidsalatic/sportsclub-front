import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Attendance } from 'src/app/models/attendance';
import { TrainingSessionService } from 'src/app/services/training-session-service';
import { TrainingSession } from 'src/app/models/training-session';
import { ActivatedRoute } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { AppUser } from 'src/app/models/app-user';
import { AttendanceService } from 'src/app/services/attendance-service';
import { AppUserCondition } from 'src/app/models/helpers/user-condition';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-attendances',
  templateUrl: './attendances.component.html',
  styleUrls: ['./attendances.component.css']
})
export class AttendancesComponent implements  OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<AppUserCondition> = new MatTableDataSource();

  displayedColumns = [ 'name','present'];

  trainingId:number;
  trainingSession:TrainingSession;
  memberGroup:MemberGroup;
  //helper class just for showing users with condition on UI
  usersWithCondition:AppUserCondition[] = new Array();
  appUsers:AppUser[];
  

  constructor(private route:ActivatedRoute,private appUserService:AppUserService
    ,private attendanceService:AttendanceService,
    private trainingSessionService:TrainingSessionService,private memberGroupService:MemberGroupService,
    private snackBar:MatSnackBar)
  {}

  ngOnInit() {
    this.trainingId=this.route.snapshot.params['id'];
    let memberGroupId = this.route.snapshot.params['groupId'];

    this.loadTrainingSession(this.trainingId);
    this.loadAppUsersInMemberGroup(memberGroupId);
  }

  loadTrainingSession(trainingId:number)
  {
    this.trainingSessionService.getById(trainingId).subscribe(training=>{
      this.trainingSession=training;
    })
  }

  loadAppUsersInMemberGroup(memberGroupId:number)
  {
    this.appUserService.getAllUsersInGroup(memberGroupId)
    .subscribe( data => {
      this.appUsers=data;
      this.loadAttendancesForTrainingSession(this.trainingId);
    })
  }

  loadAttendancesForTrainingSession(trainingId:number)
  {
    this.attendanceService.getAllAttendancesForTraining(trainingId).subscribe(data=>{
      let trainingAttendances:Attendance[] = data;
      for(let i=0;i<this.appUsers.length;i++)
      {
        let present:boolean=false;
        for(let j=0;j<trainingAttendances.length;j++)
        {
          if(this.userIsPresentAtTrainingSession(this.appUsers[i],trainingAttendances[j]))
          {
            present=true;
            break;
          }
        }
        this.createNewUserWithConditionForTable(this.appUsers[i],present);
      }
      this.dataSource.data=this.usersWithCondition;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  userIsPresentAtTrainingSession(appUser:AppUser,attendance:Attendance)
  {
    return appUser.id===attendance.appUser.id;
  }

  createNewUserWithConditionForTable(appUser:AppUser,present:boolean)
  {
    let attendance : AppUserCondition = new AppUserCondition();
    attendance.appUser=appUser;
    if(present)
      attendance.condition=true;
    else
      attendance.condition=false;
    this.usersWithCondition.push(attendance);
  }

  presentClick(checked:boolean,attendanceClicked:AppUserCondition)
  {
    if(checked)
      this.addAttendance(attendanceClicked)
    else
      this.deleteAttendance(attendanceClicked);
  }

  addAttendance(attendanceClicked:AppUserCondition)
  {
    let attendance:Attendance= new Attendance();
    attendance.appUser=attendanceClicked.appUser;
    attendance.trainingSession=this.trainingSession;
    this.attendanceService.addAttendance(attendance).subscribe(response=>{
      //attendance created in db
    })
  }

  deleteAttendance(attendanceClicked:AppUserCondition)
  {
    this.attendanceService.getByTrainingSessionAndAppUser(this.trainingSession.id,attendanceClicked.appUser.id).subscribe(attend=>{
      this.attendanceService.deleteAttendance(attend).subscribe(response=>{
        //attendance deleted in db
      })
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
