import { Injectable } from '@angular/core';
import { TrainingSession } from '../models/training-session';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TrainingSessionService{

    private readonly SESSIONS_URL = 'http://localhost:8080/sessions/';
    
    constructor(private httpClient: HttpClient){ }

    getAllTrainingSessionsByGroup(memberGroupId:number): Observable<TrainingSession[]>{
        return this.httpClient.get<TrainingSession[]>(this.SESSIONS_URL+"group/"+memberGroupId);
    }
    
    getById(id:number) : Observable<TrainingSession>
    {
        return this.httpClient.get<TrainingSession>(this.SESSIONS_URL+id);
    }

    addTrainingSession(trainingSession:TrainingSession)
    {
        return this.httpClient.post(this.SESSIONS_URL, trainingSession);
    }

    deleteTrainingSession(trainingSession: TrainingSession) {
        return this.httpClient.delete(this.SESSIONS_URL+trainingSession.id);
    }
}