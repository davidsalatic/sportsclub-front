import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Term } from '../models/term';
import { Routes } from '../const/routes';

@Injectable()
export class TermService{

    private readonly TERMS_URL = Routes.SERVER_URL+ '/terms';

    constructor(private httpClient: HttpClient){ }

    getAllTermsByMemberGroup(memberGroupId:number)
    {
        return this.httpClient.get<Term[]>(this.TERMS_URL+"/group/"+memberGroupId);
    }

    addTerm(term:Term)
    {
        return this.httpClient.post(this.TERMS_URL,term);
    }

    deleteTerm(term:Term)
    {
        return this.httpClient.delete(this.TERMS_URL+"/"+term.id);
    }
}