import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membership } from 'src/app/models/membership';
import { AppUser } from 'src/app/models/app-user';
import { MembershipService } from 'src/app/services/membership-service';
import { AppUserService } from 'src/app/services/app-user-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment-service';
import { Payment } from 'src/app/models/payment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  constructor(private route:ActivatedRoute,private membershipService:MembershipService,
    private appUserService:AppUserService,private paymentService: PaymentService,private router:Router) { }

  membership:Membership;
  appUser:AppUser;

  addPaymentForm = new FormGroup({
    dateOfPayment: new FormControl('',Validators.required),
    amount: new FormControl('')
  });

  ngOnInit(): void {
    let membershipId=this.route.snapshot.params['membershipId'];
    let appUserId=this.route.snapshot.params['appUserId'];
    this.loadMembershipAndAppUser(membershipId,appUserId);
  }

  loadMembershipAndAppUser(membershipId:number,appUserId:number)
  {
    this.membershipService.getMembershipById(membershipId).subscribe(membership=>{
      this.membership=membership;
      this.appUserService.getUserById(appUserId).subscribe(appUser=>{
        this.appUser=appUser;
      })
    })
  }

  onSubmit() {
    let payment = this.generatePaymentFromForm();
    
    this.paymentService.addPayment(payment).subscribe(response=>{
      this.router.navigate(['/payments/membership/'+this.membership.id+"/user/"+this.appUser.id]);
    });
  }

  generatePaymentFromForm() : Payment
  {
    let payment = new Payment();
    let dateOfPayment = new Date();
    dateOfPayment=this.addPaymentForm.get('dateOfPayment').value;

    payment.dayOfMonth=dateOfPayment.getDate();
    payment.monthOfPayment=dateOfPayment.getMonth()+1;
    payment.yearOfPayment=dateOfPayment.getFullYear();
    payment.amount=this.addPaymentForm.get('amount').value;
    payment.membership=this.membership;
    payment.appUser=this.appUser;
    return payment;
  }
}
