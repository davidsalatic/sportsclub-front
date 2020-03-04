import { MemberGroup } from './member-group';

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
    
    getMemberGroupName():string{
        return this.memberGroup.name;
    }
}