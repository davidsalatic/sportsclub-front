import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class AppUserService{

    private readonly APP_USERS_URL = 'http://localhost:8080/users/';

    dataChange: BehaviorSubject<AppUser[]> = new BehaviorSubject<AppUser[]>([]);
    
    constructor(public httpClient: HttpClient){ }

    public getAllUsersInGroup(id:number): Observable<AppUser[]>{
        this.httpClient.get<AppUser[]>(this.APP_USERS_URL+"group/"+id).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    addUser(appUser: AppUser)
    {
        console.log(appUser);
        return this.httpClient.post(this.APP_USERS_URL,appUser);
    }

    deleteUser(appUser: AppUser) {
        return this.httpClient.delete(this.APP_USERS_URL+appUser.id);
    }
}