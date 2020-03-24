import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Claims } from '../models/helpers/claims';
import { Routes } from '../const/routes';
import { LoginDTO } from '../models/helpers/login-dto';
import { TokenDTO } from '../models/helpers/token-dto';

@Injectable()
export class AuthService{
    
    constructor(private httpClient: HttpClient,private router:Router){ }

    private readonly AUTH_URL=Routes.SERVER_URL+"/auth";

    login(loginDTO:LoginDTO)
    {
        return this.httpClient.post<TokenDTO>(this.AUTH_URL+"/login",loginDTO);
    }

    getToken()
    {
        const headers = new HttpHeaders();
        return this.httpClient.get<string>(this.AUTH_URL+"/token",{headers,responseType:'text' as 'json'});
    }

    extractClaims(token:string)
    {
        let params = new HttpParams();
        params = params.append('token', token);
        return this.httpClient.get<Claims>(this.AUTH_URL+"/claims", {params: params})
    }
}