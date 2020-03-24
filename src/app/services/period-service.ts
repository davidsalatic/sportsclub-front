import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { Period } from '../models/period';
import { Routes } from '../const/routes';

@Injectable()
export class PeriodService{

    private readonly PERIOD_URL = Routes.SERVER_URL+'/period/';

    
    constructor(private httpClient: HttpClient){ }

    getAll()
    {
        return this.httpClient.get<Period[]>(this.PERIOD_URL);
    }

    getPeriodByMonthAndYear(month:number,year:number) {
        return this.httpClient.get<Period>(this.PERIOD_URL+"month/"+month+"/year/"+year);
    }

    getPeriodById(id:number)
    {
        return this.httpClient.get<Period>(this.PERIOD_URL+id);
    }

    addPeriod(period: Period)
    {
        return this.httpClient.post(this.PERIOD_URL,period);
    }
}