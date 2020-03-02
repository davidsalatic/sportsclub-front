import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Membership } from '../models/membership';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MembershipService
{

    private readonly MEMBERSHIPS_URL='http://localhost:8080/memberships/';

    constructor(public httpClient: HttpClient){ }

    dataChange: BehaviorSubject<Membership[]> = new BehaviorSubject<Membership[]>([]);

    public getAllMemberships(): Observable<Membership[]>{
        this.httpClient.get<Membership[]>(this.MEMBERSHIPS_URL).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }
}