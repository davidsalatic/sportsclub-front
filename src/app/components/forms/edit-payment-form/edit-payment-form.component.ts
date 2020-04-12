import { Component, OnInit } from '@angular/core';
import { Payment } from 'src/app/models/payment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { TitleService } from 'src/app/services/title-service';
import { PaymentService } from 'src/app/services/payment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-payment-form',
  templateUrl: './edit-payment-form.component.html',
  styleUrls: ['./edit-payment-form.component.css']
})
export class EditPaymentFormComponent implements OnInit {

  payment:Payment;

  editPaymentForm = new FormGroup({
    dateOfPayment: new FormControl('',Validators.required),
    amount: new FormControl('',Validators.required)
  });

  constructor(private authService:AuthService,private paymentService:PaymentService,
    private titleService:TitleService,private route:ActivatedRoute,private router:Router
    ,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isManagerLoggedIn())
      {            
        let paymentId=this.route.snapshot.params['id'];
        this.loadPayment(paymentId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadPayment(paymentId:number)
  {
    this.paymentService.getById(paymentId).subscribe(payment=>{
      this.payment=payment;
      this.titleService.changeTitle("Edit payment");
      this.updateFormWithPaymentData();
    })
  }

  updateFormWithPaymentData()
  {
    let date:Date =new Date();
    date.setMonth(this.payment.monthOfPayment-1);
    date.setDate(this.payment.dayOfMonth);
    date.setFullYear(this.payment.yearOfPayment);
    this.editPaymentForm.patchValue({
      dateOfPayment:date,
      amount: this.payment.amount, 
    });
  }

  onSubmit()
  {
    this.payment.amount=this.editPaymentForm.get('amount').value;
    let dateForm:Date = this.editPaymentForm.get('dateOfPayment').value;
    this.payment.dayOfMonth=dateForm.getDate();
    this.payment.monthOfPayment=dateForm.getMonth()+1;
    this.payment.yearOfPayment=dateForm.getFullYear();

    this.updatePaymentAndGoToRoute();

  }
  
  updatePaymentAndGoToRoute()
  {
    this.paymentService.updatePayment(this.payment).subscribe(response=>{
      this.showSnackbar("Payment updated.");
      this.navigateToMemberPayments();
    })
  }

  deletePayment()
  {
    if(confirm("Delete this payment?")) {
      this.paymentService.deletePayment(this.payment).subscribe(response=>{
        this.showSnackbar("Payment deleted.");
        this.navigateToMemberPayments();
      })
    }
  }

  navigateToMemberPayments()
  {
    this.router.navigate(["/payments/membership/"+this.payment.membership.id+"/user/"+this.payment.appUser.id]);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }

}
