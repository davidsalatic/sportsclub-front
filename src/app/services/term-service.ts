import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getById(termId: number) {
        return this.httpClient.get<Term>(this.TERMS_URL+"/"+termId);
      }

    addTerm(term:Term)
    {
        return this.httpClient.post(this.TERMS_URL,term);
    }

    updateTerm(term:Term)
    {
        return this.httpClient.put(this.TERMS_URL,term);
    }

    deleteTerm(term:Term)
    {
        return this.httpClient.delete(this.TERMS_URL+"/"+term.id);
    }
}