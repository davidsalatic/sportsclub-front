import { AppUser } from './app-user';
import { TrainingSession } from './training-session';

export class Attendance{
    id:number;
    appUser:AppUser;
    trainingSession:TrainingSession;
}