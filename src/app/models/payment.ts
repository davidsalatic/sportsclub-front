import { AppUser } from './app-user';
import { Membership } from './membership';

export class Payment{

    id:number;
    amount:number;
    monthOfPayment:number;
    dayOfMonth:number;
    yearOfPayment:number;
    appUser:AppUser;
    membership:Membership;
}