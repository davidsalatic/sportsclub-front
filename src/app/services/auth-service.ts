import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppUser } from '../models/app-user';

@Injectable()
export class AuthService{

    private readonly AUTH_URL = 'http://localhost:8080/authenticate/';

    constructor(private httpClient: HttpClient){ }

    authenticate(appUser:AppUser)
    {
        return this.httpClient.post(this.AUTH_URL,appUser);
    }

}