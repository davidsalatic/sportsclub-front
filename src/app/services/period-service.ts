import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Period } from '../models/period';

@Injectable()
export class PeriodService{

    private readonly PERIOD_URL = 'http://localhost:8080/period/';

    
    constructor(private httpClient: HttpClient){ }

    getPeriodByMonthAndYear(month:number,year:number) {
        return this.httpClient.get<Period>(this.PERIOD_URL+"month/"+month+"/year/"+year);
    }

    addPeriod(period: Period)
    {
        return this.httpClient.post(this.PERIOD_URL,period);
    }
}