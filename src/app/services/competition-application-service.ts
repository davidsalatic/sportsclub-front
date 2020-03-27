import { Injectable } from '@angular/core';
import { Routes } from '../const/routes';
import { HttpClient } from '@angular/common/http';
import { CompetitionApplication } from '../models/competition-application';

@Injectable()
export class CompetitionApplicationService{

    private readonly APPLICATIONS_URL = Routes.SERVER_URL+'/applications';

    constructor(private httpClient: HttpClient){ }

    getByCompetitionAndAppUser(competitiondId:number,appUserId:number)
    {
        return this.httpClient.get<CompetitionApplication>(this.APPLICATIONS_URL+"/competition/"+competitiondId+"/user/"+appUserId);
    }

    getAllByCompetition(competitiondId:number)
    {
        return this.httpClient.get<CompetitionApplication[]>(this.APPLICATIONS_URL+"/competition/"+competitiondId);
    }

    addCompetitionApplication(application:CompetitionApplication)
    {
        return this.httpClient.post(this.APPLICATIONS_URL,application);
    }

    deleteCompetitionApplication(application:CompetitionApplication)
    {
        return this.httpClient.delete(this.APPLICATIONS_URL+"/"+application.id);
    }


}