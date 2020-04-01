import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Claims } from '../models/helpers/claims';
import { Routes } from '../const/routes';
import { LoginDTO } from '../models/helpers/login-dto';
import { TokenDTO } from '../models/helpers/token-dto';
import { BehaviorSubject } from 'rxjs';
import { RegisterDTO } from '../models/helpers/register-dto';
import { AppUser } from '../models/app-user';
import { Roles } from '../const/role-const';

@Injectable()
export class AuthService{
    
    constructor(private httpClient: HttpClient){ }

    private readonly AUTH_URL=Routes.SERVER_URL+"/auth";

    private logged = new BehaviorSubject(true);
    isLoggedIn = this.logged.asObservable();

    changeIsLoggedIn(loggedIn:boolean)
    {
        this.logged.next(loggedIn)
    }

    login(loginDTO:LoginDTO)
    {
        return this.httpClient.post<TokenDTO>(this.AUTH_URL+"/login",loginDTO);
    }

    register(registerDTO:RegisterDTO)
    {
        return this.httpClient.post(this.AUTH_URL+"/register",registerDTO);
    }

    checkToken(tokenDTO:TokenDTO)
    {
        return this.httpClient.post<AppUser>(this.AUTH_URL+"/check-token",tokenDTO);
    }

    setToken(token:string)
    {
        this.changeIsLoggedIn(true);
        sessionStorage.setItem('token',token);
    }

    getToken()
    {
        return sessionStorage.getItem('token');
    }

    setLoggedInRole(role:string)
    {
        sessionStorage.setItem('role',role);
    }

    getLoggedInRole()
    {
        return sessionStorage.getItem('role');
    }

    setLoggedInUsername(username:string)
    {
        sessionStorage.setItem('username',username);
    }

    getLoggedInUsername()
    {
        return sessionStorage.getItem('username');
    }

    extractClaims(token:string)
    {
        let params = new HttpParams();
        params = params.append('token', token);
        return this.httpClient.get<Claims>(this.AUTH_URL+"/claims", {params: params})
    }

    clearSession()
    {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('username');
        this.changeIsLoggedIn(false);
    }

    setRouteAfterLogin(route:string)
    {
        sessionStorage.setItem('route-after-login',route);
    }

    getRouteAfterLogin():string
    {
        return sessionStorage.getItem('route-after-login');
    }

    clearRouteAfterLogin()
    {
        sessionStorage.removeItem('route-after-login');
    }

    isMemberLoggedIn():boolean
    {
        return this.getLoggedInRole()===Roles.MEMBER;
    }

    isManagerLoggedIn():boolean
    {
        return this.getLoggedInRole()===Roles.MANAGER;
    }

    isCoachOrManagerLoggedIn():boolean
    {
        let role = this.getLoggedInRole();
        return role===Roles.MANAGER || role===Roles.COACH;
    }
}