import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../models/app-user';
import { AppUserService } from './app-user-service';

@Injectable()
export class AttendanceService{

    private readonly ATTENDANCES_URL = 'http://localhost:8080/attendances';


    constructor(private httpClient: HttpClient){ }

    getAllAttendancesForTraining(trainingId:number): Observable<Attendance[]>{
        return this.httpClient.get<Attendance[]>(this.ATTENDANCES_URL+"/training/"+trainingId);
    }

    getByTrainingSessionAndAppUser(trainingSessionId:number,appUserId:number)
    {
        return this.httpClient.get<Attendance>(this.ATTENDANCES_URL+"/session/"+trainingSessionId+"/user/"+appUserId);
    }

    getByAppUser(appUser:AppUser)
    {
        return this.httpClient.get<Attendance[]>(this.ATTENDANCES_URL+"/member/"+appUser.id);
    }

    addAttendance(attendance:Attendance)
    {
        return this.httpClient.post<Attendance>(this.ATTENDANCES_URL, attendance);
    }

    deleteAttendance(attendance: Attendance) {
        return this.httpClient.delete(this.ATTENDANCES_URL+"/"+attendance.id);
    }
}