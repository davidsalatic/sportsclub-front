import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from '../models/membership';

import { HttpClient } from '@angular/common/http';
import { MembershipPrice } from '../models/membership-price';
import { Period } from '../models/period';

@Injectable()
export class MembershipService
{

    private readonly MEMBERSHIPS_URL='http://localhost:8080/memberships';

    constructor(private httpClient: HttpClient){ }

    getAllMemberships(): Observable<Membership[]>{
        return this.httpClient.get<Membership[]>(this.MEMBERSHIPS_URL);
    }

    getMembershipById(id:number) : Observable<Membership>
    {
        return this.httpClient.get<Membership>(this.MEMBERSHIPS_URL+"/"+id);
    }

    getAllByMonthAndYear(month:number,year:number){
        return this.httpClient.get<Membership>(this.MEMBERSHIPS_URL+"/"+month+"/"+year);
    }

    addMembership(membership: Membership)
    {
        return this.httpClient.post(this.MEMBERSHIPS_URL,membership);
    }

    updateMembership(membership: Membership)
    {
        return this.httpClient.put(this.MEMBERSHIPS_URL,membership);
    }


    setMembershipPrice(membershipPrice:MembershipPrice)
    {
        return this.httpClient.post(this.MEMBERSHIPS_URL+"/price",membershipPrice);
    }

    getMembershipPrice() 
    {
        return this.httpClient.get<MembershipPrice>(this.MEMBERSHIPS_URL+"/price");
    }
}