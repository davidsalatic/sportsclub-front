import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membership } from 'src/app/models/membership';
import { AppUser } from 'src/app/models/app-user';
import { MembershipService } from 'src/app/services/membership-service';
import { AppUserService } from 'src/app/services/app-user-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment-service';
import { Payment } from 'src/app/models/payment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent implements OnInit {

  constructor(private route:ActivatedRoute,private membershipService:MembershipService,
    private appUserService:AppUserService,private paymentService: PaymentService,
    private titleService:TitleService,
    private router:Router,private snackBar:MatSnackBar,private authService:AuthService) { }

  membership:Membership;
  appUser:AppUser;

  addPaymentForm = new FormGroup({
    dateOfPayment: new FormControl('',Validators.required),
    amount: new FormControl('')
  });

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isManagerLoggedIn())
      {            
        let membershipId=this.route.snapshot.params['membershipId'];
        let appUserId=this.route.snapshot.params['appUserId'];
        this.loadMembership(membershipId);
        this.loadAppUser(appUserId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadMembership(membershipId:number)
  {
    this.membershipService.getMembershipById(membershipId).subscribe(membership=>{
      this.membership=membership;
      this.titleService.changeTitle("Add payment for "+membership.period.month+"-"+membership.period.year);
    })
  }

  loadAppUser(appUserId:number)
  {
    this.appUserService.getUserById(appUserId).subscribe(appUser=>{
      this.appUser=appUser;
    })
  }

  onSubmit() {
    let payment = this.generatePaymentFromForm();
    
    this.paymentService.addPayment(payment).subscribe(response=>{
      this.router.navigate(['/payments/membership/'+this.membership.id+"/user/"+this.appUser.id]);
      this.showSnackbar("Payment added.")
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

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}