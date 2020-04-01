import { AppUser } from './app-user';

export class Post
{
    id:number;
    title:string;
    text:string;
    dateTime:Date;
    appUser:AppUser;
}