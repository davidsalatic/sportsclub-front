import { MemberGroup } from './member-group';
import { Period } from './period';

export class TrainingSession{
    id:number;
    dateHeld:Date;
    timeHeld:Date;
    memberGroup:MemberGroup;
    period:Period;
    dayOfWeek:string;
}