import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Routes } from '../const/routes';

@Injectable()
export class AppUserService {

    private readonly APP_USERS_URL = Routes.SERVER_URL + '/users/';

    constructor(private httpClient: HttpClient) { }

    getAllMembers(): Observable<AppUser[]> {
        return this.httpClient.get<AppUser[]>(this.APP_USERS_URL + "members");
    }

    getStaff() {
        return this.httpClient.get<AppUser[]>(this.APP_USERS_URL + "staff");
    }

    getAllUsers(): Observable<AppUser[]> {

        return this.httpClient.get<AppUser[]>(this.APP_USERS_URL);
    }

    getUngroupedMembers() {
        return this.httpClient.get<AppUser[]>(this.APP_USERS_URL + "members/ungrouped");
    }

    getAllUsersInGroup(id: number): Observable<AppUser[]> {
        return this.httpClient.get<AppUser[]>(this.APP_USERS_URL + "group/" + id);
    }

    getUserById(id: number): Observable<AppUser> {
        return this.httpClient.get<AppUser>(this.APP_USERS_URL + id);
    }

    getByUsername(username: string) {
        let params = new HttpParams();
        params = params.append('username', username);
        return this.httpClient.get<AppUser>(this.APP_USERS_URL + "search/username", { params: params })
    }

    getByJmbg(jmbg: string) {
        let params = new HttpParams();
        params = params.append('jmbg', jmbg);
        return this.httpClient.get<AppUser>(this.APP_USERS_URL + "search/jmbg", { params: params })
    }

    addUser(appUser: AppUser) {
        return this.httpClient.post(this.APP_USERS_URL, appUser);
    }

    updateUser(appUser: AppUser) {
        return this.httpClient.put(this.APP_USERS_URL, appUser);
    }

    updateSelf(appUser: AppUser) {
        return this.httpClient.put(this.APP_USERS_URL + "update-self", appUser);
    }

    deleteUser(appUser: AppUser) {
        return this.httpClient.delete(this.APP_USERS_URL + appUser.id);
    }
}