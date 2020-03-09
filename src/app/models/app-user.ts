import { MemberGroup } from './member-group';
import { Role } from './role';

export class AppUser{
    id:number;
    username:string;
    password:string;
    name:string;
    surname:string;
    jmbg:string;
    address:string;
    phoneNumber:string;
    dateJoined:Date;
    memberGroup:MemberGroup;
    role:Role;
}