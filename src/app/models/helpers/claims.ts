import { Role } from '../role';

export class Claims{
    sub:string;
    role:Role;
    exp:number;
    iat:number;
}