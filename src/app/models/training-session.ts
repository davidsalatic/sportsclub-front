import { MemberGroup } from './member-group';
import { Period } from './period';

export class TrainingSession{

    daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    id:number;
    dateHeld:Date;
    timeHeld:Date;
    memberGroup:MemberGroup;
    period:Period;
    dayOfWeek:string;
}