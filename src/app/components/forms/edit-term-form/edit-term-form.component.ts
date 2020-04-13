import { Component, OnInit } from '@angular/core';
import { Term } from 'src/app/models/term';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { PaymentService } from 'src/app/services/payment-service';
import { TitleService } from 'src/app/services/title-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TermService } from 'src/app/services/term-service';

@Component({
  selector: 'app-edit-term-form',
  templateUrl: './edit-term-form.component.html',
  styleUrls: ['./edit-term-form.component.css']
})
export class EditTermFormComponent implements OnInit {

  daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  term:Term;

  editTermForm = new FormGroup({
    durationMinutes: new FormControl('',Validators.required),
    daysOfWeek: new FormControl('',Validators.required),
    startTime:new FormControl('',Validators.required)
  });

  constructor(private authService:AuthService,private termService:TermService,
    private titleService:TitleService,private route:ActivatedRoute,private router:Router
    ,private snackBar:MatSnackBar) { 
      this.titleService.changeTitle("Edit term");
    }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {            
        let termId=this.route.snapshot.params['id'];
        this.loadTerm(termId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadTerm(termId:number)
  {
    this.termService.getById(termId).subscribe(term=>{
      this.term=term;
      this.updateFormWithPaymentData();
    })
  }

  updateFormWithPaymentData()
  {
    this.editTermForm.patchValue({
      durationMinutes: this.term.durationMinutes,
      daysOfWeek: this.term.dayOfWeek,
      startTime: this.term.startTime
    });
  }

  deleteTerm()
  {
    if(confirm("Delete this term?"))
    this.termService.deleteTerm(this.term).subscribe(response=>{
      this.showSnackbar("Term deleted.");
      this.navigateToGroupTerms();
    })
  }

  onSubmit()
  {
    this.term.dayOfWeek=this.editTermForm.get('daysOfWeek').value;
    this.term.durationMinutes=this.editTermForm.get('durationMinutes').value;
    this.term.startTime=this.editTermForm.get('startTime').value;

    this.updateTermAndGoToRoute();

  }
  
  updateTermAndGoToRoute()
  {
    this.termService.updateTerm(this.term).subscribe(response=>{
      this.showSnackbar("Term updated.");
      this.navigateToGroupTerms();
    })
  }


  navigateToGroupTerms()
  {
    this.router.navigate(['terms/group/'+this.term.memberGroup.id]);
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
