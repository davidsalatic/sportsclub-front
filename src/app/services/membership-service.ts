import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Membership } from '../models/membership';
import { MembershipPrice } from '../models/price';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MembershipService
{

    private readonly MEMBERSHIPS_URL='http://localhost:8080/memberships/';
    private readonly PRICE_URL='http://localhost:8080/membership-price"';

    constructor(public httpClient: HttpClient){ }

    dataChange: BehaviorSubject<Membership[]> = new BehaviorSubject<Membership[]>([]);

    _dataChange: BehaviorSubject<Membership[]> = new BehaviorSubject<Membership[]>([]);

    public getAllMemberships(): Observable<Membership[]>{
        this.httpClient.get<Membership[]>(this.MEMBERSHIPS_URL).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
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

    setMembershipPrice(price:MembershipPrice)
    {
        console.log(price);
        return this.httpClient.post(this.PRICE_URL,price);
    }

    public getMembershipPrice()
    {
        return this.httpClient.get<number>(this.PRICE_URL);
    }
}