import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable()
export class AppUserService{

    private readonly APP_USERS_URL = 'http://localhost:8080/users/';

    dataChange: BehaviorSubject<AppUser[]> = new BehaviorSubject<AppUser[]>([]);
    
    constructor(public httpClient: HttpClient,private http: HttpClient){ }

    public getAllUsers(): Observable<AppUser[]>{
        this.httpClient.get<AppUser[]>(this.APP_USERS_URL).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public getAllUsersInGroup(id:number): Observable<AppUser[]>{
        this.httpClient.get<AppUser[]>(this.APP_USERS_URL+"group/"+id).subscribe(data =>{
            this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
            console.log(error.name + ' ' + error.message);
        });
        return this.dataChange.asObservable();
    }

    public getUserById(id:number) : Observable<AppUser>
    {
        return this.httpClient.get<AppUser>(this.APP_USERS_URL+id);
    }

    addUser(appUser: AppUser)
    {
        return this.httpClient.post(this.APP_USERS_URL,appUser);
    }
    
    public updateUser(appUser: AppUser)
    {
        return this.httpClient.put(this.APP_USERS_URL,appUser);
    }

    public getByUsername(username:string)
    {
        let params = new HttpParams();
        params = params.append('username', username);
        return this.httpClient.get<AppUser[]>(this.APP_USERS_URL+"search/username", {params: params})
    }

    public getByJmbg(jmbg:string)
    {
        let params = new HttpParams();
        params = params.append('jmbg', jmbg);
        return this.httpClient.get<AppUser[]>(this.APP_USERS_URL+"search/jmbg", {params: params})
    }

    deleteUser(appUser: AppUser) {
        return this.httpClient.delete(this.APP_USERS_URL+appUser.id);
    }
}