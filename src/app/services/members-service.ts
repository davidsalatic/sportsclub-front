import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable
export class MembersService {

    private readonly GROUPS_URL = 'http://localhost:8080/groups/';
    private readonly USERS_URL = 'http://localhost:8080/users/';

    dataChange: BehaviorSubject<Racun[]> = new BehaviorSubject<Racun[]>([]);
    
    constructor(private httpClient: HttpClient){ }
}