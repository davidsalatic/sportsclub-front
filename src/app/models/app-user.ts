import { MemberGroup } from './member-group';

export class AppUser{
    id:number;
    username:string;
    name:string;
    surname:string;
    jmbg:string;
    adress:string;
    phoneNumber:string;
    dateJoined:Date;
    memberGroup:MemberGroup;
    //TODO
    //add role property]
}