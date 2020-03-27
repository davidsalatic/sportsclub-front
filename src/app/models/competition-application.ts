import { Competition } from './competition';
import { AppUser } from './app-user';

export class CompetitionApplication{
    id:number;
    competition:Competition;
    appUser:AppUser;
    message:string;
}