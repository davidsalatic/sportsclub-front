import { Injectable } from '@angular/core';
import { Routes } from '../const/routes';
import { HttpClient } from '@angular/common/http';
import { Competition } from '../models/competition';

@Injectable()
export class CompetitionService{

    private readonly COMPETITIONS_URL=Routes.SERVER_URL+'/competitions/';

    constructor(private httpClient: HttpClient){ }

    getAllCompetitions()
    {
        return this.httpClient.get<Competition[]>(this.COMPETITIONS_URL);
    }

    getCompetitionById(id:number)
    {
        return this.httpClient.get<Competition>(this.COMPETITIONS_URL+id);
    }

    addCompetition(competition:Competition)
    {
        return this.httpClient.post(this.COMPETITIONS_URL,competition);
    }

    sendInvitations(competition:Competition)
    {
        return this.httpClient.post(this.COMPETITIONS_URL+"invite",competition);
    }
    
    updateCompetition(competition:Competition)
    {
        return this.httpClient.put(this.COMPETITIONS_URL,competition);
    }

    deleteCompetition(competitionId:number)
    {
        return this.httpClient.delete(this.COMPETITIONS_URL+competitionId);
    }
}