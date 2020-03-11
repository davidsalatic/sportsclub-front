import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppUser } from '../models/app-user';

@Injectable()
export class AuthService{

    private readonly AUTH_URL = 'http://localhost:8080/authenticate';

    constructor(private httpClient: HttpClient){ }

    authenticate(appUser:AppUser)
    {
        const headers = new HttpHeaders();
        return this.httpClient.post<string>(this.AUTH_URL,appUser, { headers, responseType: 'text' as 'json' });
    }

}