import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Membership } from '../models/membership';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MembershipPrice } from '../models/membership-price';

@Injectable()
export class MembershipService
{

    private readonly MEMBERSHIPS_URL='http://localhost:8080/memberships/';

    constructor(public httpClient: HttpClient){ }

    public getAllMemberships(): Observable<Membership[]>{
        return this.httpClient.get<Membership[]>(this.MEMBERSHIPS_URL);
    }

    public getMembershipById(id:number) : Observable<Membership>
    {
        return this.httpClient.get<Membership>(this.MEMBERSHIPS_URL+id);
    }

    public getAllByMonthAndYear(month:number,year:number){
        return this.httpClient.get<Membership>(this.MEMBERSHIPS_URL+month+"/"+year);
    }

    addMembership(membership: Membership)
    {
        return this.httpClient.post(this.MEMBERSHIPS_URL,membership);
    }

    public updateMembership(membership: Membership)
    {
        return this.httpClient.put(this.MEMBERSHIPS_URL,membership);
    }


    setMembershipPrice(membershipPrice:MembershipPrice)
    {
        return this.httpClient.post(this.MEMBERSHIPS_URL+"price",membershipPrice);
    }

    public getMembershipPrice() 
    {
        return this.httpClient.get<MembershipPrice>(this.MEMBERSHIPS_URL+"price");
    }
}