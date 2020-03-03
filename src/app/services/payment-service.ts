import { BehaviorSubject, Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService{

    private readonly APP_USERS_URL = 'http://localhost:8080/payments/';

    dataChange: BehaviorSubject<Payment[]> = new BehaviorSubject<Payment[]>([]);
    
    constructor(public httpClient: HttpClient){ }

    public getAllPaymentsForMembershipByUser(membershipId:number,appUserId:number): Observable<Payment[]>{
        this.httpClient.get<Payment[]>(this.APP_USERS_URL+"membership/"+membershipId+"/user/"+appUserId).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }
}