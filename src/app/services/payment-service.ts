import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Routes } from '../const/routes';

@Injectable()
export class PaymentService{

    private readonly PAYMENTS_URL = Routes.SERVER_URL+'/payments/';

    constructor(private httpClient: HttpClient){ }

    getAllPaymentsForMembershipByUser(membershipId:number,appUserId:number): Observable<Payment[]>{
        return this.httpClient.get<Payment[]>(this.PAYMENTS_URL+"membership/"+membershipId+"/user/"+appUserId);
    }

    getAllPaymentsForMembership(membershipId:number): Observable<Payment[]>{
        return this.httpClient.get<Payment[]>(this.PAYMENTS_URL+"membership/"+membershipId);
    }

    getAllPaymentsByAppUser(appUserId:number)
    {
        return this.httpClient.get<Payment[]>(this.PAYMENTS_URL+"member/"+appUserId);
    }

    getById(id:number) : Observable<Payment>
    {
        return this.httpClient.get<Payment>(this.PAYMENTS_URL+id);
    }

    addPayment(payment: Payment)
    {
        return this.httpClient.post(this.PAYMENTS_URL,payment);
    }

    updatePayment(payment: Payment) {
        return this.httpClient.put(this.PAYMENTS_URL,payment);
      }

    deletePayment(payment: Payment) {
        return this.httpClient.delete(this.PAYMENTS_URL+payment.id);
    }
}