import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from '../models/attendance';
import { HttpClient } from '@angular/common/http';
import { Routes } from '../const/routes';

@Injectable()
export class AttendanceService{

    private readonly ATTENDANCES_URL = Routes.SERVER_URL+'/attendances';


    constructor(private httpClient: HttpClient){ }

    getAllAttendancesForTraining(trainingId:number): Observable<Attendance[]>{
        return this.httpClient.get<Attendance[]>(this.ATTENDANCES_URL+"/training/"+trainingId);
    }

    getByTrainingSessionAndAppUser(trainingSessionId:number,appUserId:number)
    {
        return this.httpClient.get<Attendance>(this.ATTENDANCES_URL+"/session/"+trainingSessionId+"/user/"+appUserId);
    }

    getByAppUser(appUserId:number)
    {
        return this.httpClient.get<Attendance[]>(this.ATTENDANCES_URL+"/member/"+appUserId);
    }

    addAttendance(attendance:Attendance)
    {
        return this.httpClient.post<Attendance>(this.ATTENDANCES_URL, attendance);
    }

    deleteAttendance(attendance: Attendance) {
        return this.httpClient.delete(this.ATTENDANCES_URL+"/"+attendance.id);
    }
}