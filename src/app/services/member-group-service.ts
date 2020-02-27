import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MemberGroup } from '../models/member-group';

@Injectable()
export class MemberGroupService {

    private readonly GROUPS_URL = 'http://localhost:8080/groups/';

    dataChange: BehaviorSubject<MemberGroup[]> = new BehaviorSubject<MemberGroup[]>([]);
    
    constructor(public httpClient: HttpClient){ }

    public getAllGroups(): Observable<MemberGroup[]>{
        this.httpClient.get<MemberGroup[]>(this.GROUPS_URL).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public addGroup(memberGroup:MemberGroup)
    {
        return this.httpClient.post(this.GROUPS_URL, memberGroup);
    }
}