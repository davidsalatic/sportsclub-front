import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Role } from '../models/role';

@Injectable()
export class RoleService{

    private readonly ROLES_URL = 'http://localhost:8080/roles/';

    constructor(private httpClient: HttpClient,private http: HttpClient){ }

    getByName(name:string)
    {
        let params = new HttpParams();
        params = params.append('name', name);
        return this.httpClient.get<Role>(this.ROLES_URL+"search", {params: params})
    }
}