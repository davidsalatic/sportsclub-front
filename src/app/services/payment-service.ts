import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PaymentService{

    private readonly PAYMENTS_URL = 'http://localhost:8080/payments/';

    
    constructor(private httpClient: HttpClient){ }

    getAllPaymentsForMembershipByUser(membershipId:number,appUserId:number): Observable<Payment[]>{
        return this.httpClient.get<Payment[]>(this.PAYMENTS_URL+"membership/"+membershipId+"/user/"+appUserId);
    }

    getAllPaymentsForMembership(membershipId:number): Observable<Payment[]>{
        return this.httpClient.get<Payment[]>(this.PAYMENTS_URL+"membership/"+membershipId);
    }

    getById(id:number) : Observable<Payment>
    {
        return this.httpClient.get<Payment>(this.PAYMENTS_URL+id);
    }

    addPayment(payment: Payment)
    {
        return this.httpClient.post(this.PAYMENTS_URL,payment);
    }

    deletePayment(payment: Payment) {
        return this.httpClient.delete(this.PAYMENTS_URL+payment.id);
    }
}