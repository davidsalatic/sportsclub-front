import { Injectable } from '@angular/core';
import { TrainingSession } from '../models/training-session';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MemberGroup } from '../models/member-group';

@Injectable()
export class TrainingSessionService{

    private readonly SESSIONS_URL = 'http://localhost:8080/sessions/';

    dataChange: BehaviorSubject<TrainingSession[]> = new BehaviorSubject<TrainingSession[]>([]);
    
    constructor(public httpClient: HttpClient){ }

    public getAllTrainingSessionsByGroup(memberGroupId:number): Observable<TrainingSession[]>{
        this.httpClient.get<TrainingSession[]>(this.SESSIONS_URL+"group/"+memberGroupId).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public addTrainingSession(trainingSession:TrainingSession)
    {
        return this.httpClient.post(this.SESSIONS_URL, trainingSession);
    }

    deleteTrainingSession(trainingSession: TrainingSession) {
        return this.httpClient.delete(this.SESSIONS_URL+trainingSession.id);
    }
}