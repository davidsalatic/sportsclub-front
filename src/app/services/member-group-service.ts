import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MemberGroup } from '../models/member-group';
import { AppUser } from '../models/app-user';
import { Routes } from '../const/routes';
import { AuthService } from './auth-service';

@Injectable()
export class MemberGroupService {

    private readonly GROUPS_URL = Routes.SERVER_URL+'/groups';

    constructor(private httpClient: HttpClient,private authService:AuthService){ }

    getAllGroups(): Observable<MemberGroup[]>{
        return this.httpClient.get<MemberGroup[]>(this.GROUPS_URL)
    }

    getGroupById(id:number) : Observable<MemberGroup>
    {
        return this.httpClient.get<MemberGroup>(this.GROUPS_URL+"/"+id);
    }

    getGroupByName(name:string)
    {
        let params = new HttpParams();
        params = params.append('name', name);
        return this.httpClient.get<MemberGroup>(this.GROUPS_URL+"/search/name", {params: params})
    }


    addGroup(memberGroup:MemberGroup)
    {
        return this.httpClient.post(this.GROUPS_URL, memberGroup);
    }

    updateGroup(memberGroup: MemberGroup)
    {
        return this.httpClient.put(this.GROUPS_URL,memberGroup);
    }

    deleteGroup(memberGroup: MemberGroup) {
        return this.httpClient.delete(this.GROUPS_URL+"/"+memberGroup.id);
    }
}