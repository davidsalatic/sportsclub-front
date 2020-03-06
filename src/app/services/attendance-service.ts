import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Attendance } from '../models/attendance';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppUser } from '../models/app-user';

@Injectable()
export class AttendanceService{

    private readonly ATTENDANCES_URL = 'http://localhost:8080/attendances/';


    constructor(public httpClient: HttpClient){ }

    public getAllAttendancesForTraining(trainingId:number): Observable<Attendance[]>{
        return this.httpClient.get<Attendance[]>(this.ATTENDANCES_URL+"training/"+trainingId);
    }

    getByTrainingSessionAndAppUser(trainingSessionId:number,appUserId:number)
    {
        return this.httpClient.get<Attendance>(this.ATTENDANCES_URL+"session/"+trainingSessionId+"/user/"+appUserId);
    }

    addAttendance(attendance:Attendance)
    {
        return this.httpClient.post(this.ATTENDANCES_URL, attendance);
    }

    deleteAttendance(attendance: Attendance) {
        return this.httpClient.delete(this.ATTENDANCES_URL+attendance.id);
    }
}