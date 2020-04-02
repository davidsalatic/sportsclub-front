import { Post } from './post';
import { AppUser } from './app-user';

export class Comment{
    id:number;
    text:string;
    dateTime:Date;
    post:Post;
    appUser:AppUser;
}