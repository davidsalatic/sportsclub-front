import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MemberGroup } from '../models/member-group';

@Injectable()
export class MemberGroupService {

    private readonly GROUPS_URL = 'http://localhost:8080/groups/';


    constructor(public httpClient: HttpClient){ }

    public getAllGroups(): Observable<MemberGroup[]>{
        return this.httpClient.get<MemberGroup[]>(this.GROUPS_URL);
    }

    public getGroupById(id:number) : Observable<MemberGroup>
    {
        return this.httpClient.get<MemberGroup>(this.GROUPS_URL+id);
    }

    public addGroup(memberGroup:MemberGroup)
    {
        return this.httpClient.post(this.GROUPS_URL, memberGroup);
    }

    public updateGroup(memberGroup: MemberGroup)
    {
        return this.httpClient.put(this.GROUPS_URL,memberGroup);
    }

    deleteGroup(memberGroup: MemberGroup) {
        return this.httpClient.delete(this.GROUPS_URL+memberGroup.id);
    }
}