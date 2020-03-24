import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Role } from '../models/role';
import { Routes } from '../const/routes';

@Injectable()
export class RoleService{

    private readonly ROLES_URL = Routes.SERVER_URL+ '/roles/';

    constructor(private httpClient: HttpClient){ }

    getByName(name:string)
    {
        let params = new HttpParams();
        params = params.append('name', name);
        return this.httpClient.get<Role>(this.ROLES_URL+"search", {params: params})
    }
}