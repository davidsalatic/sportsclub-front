import { Injectable } from '@angular/core';
import { TrainingSession } from '../models/training-session';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Term } from '../models/term';
import { Routes } from '../const/routes';

@Injectable()
export class TrainingSessionService{

    private readonly SESSIONS_URL = Routes.SERVER_URL+'/sessions/';
    
    constructor(private httpClient: HttpClient){ }

    getAllTrainingSessionsByGroupByPeriod(memberGroupId:number,periodId:number): Observable<TrainingSession[]>{
        return this.httpClient.get<TrainingSession[]>(this.SESSIONS_URL+"group/"+memberGroupId+"/per/"+periodId);
    }
    
    getById(id:number) : Observable<TrainingSession>
    {
        return this.httpClient.get<TrainingSession>(this.SESSIONS_URL+id);
    }

    addTrainingSession(trainingSession:TrainingSession)
    {
        return this.httpClient.post(this.SESSIONS_URL, trainingSession);
    }

    generateTrainingSessionsForTerms(terms:Term[],periodId:number,day:number)
    {
        return this.httpClient.post(this.SESSIONS_URL+"generate/per/"+periodId+"/day/"+day,terms);
    }

    deleteTrainingSession(trainingSession: TrainingSession) {
        return this.httpClient.delete(this.SESSIONS_URL+trainingSession.id);
    }

    deleteTrainingSessionsInGroupInPeriod(memberGroupId:number,periodId:number)
    {
        return this.httpClient.delete(this.SESSIONS_URL+"group/"+memberGroupId+"/"+periodId);
    }
}