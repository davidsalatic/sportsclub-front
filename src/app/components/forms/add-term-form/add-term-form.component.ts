import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Claims } from 'src/app/models/helpers/claims';
import { Roles } from 'src/app/const/role-const';
import { Term } from 'src/app/models/term';
import { TermService } from 'src/app/services/term-service';

@Component({
  selector: 'app-add-term-form',
  templateUrl: './add-term-form.component.html',
  styleUrls: ['./add-term-form.component.css']
})
export class AddTermFormComponent implements OnInit {
  
  daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  constructor(private router:Router,private snackBar:MatSnackBar,private authService:AuthService
    ,private termService:TermService) { }

  addTermForm = new FormGroup({
    durationMinutes: new FormControl('',Validators.required),
    daysOfWeek: new FormControl('',Validators.required),
    startTime:new FormControl('',Validators.required)
  });

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    this.authService.getToken().subscribe(token=>{
      this.authService.extractClaims(token).subscribe(claims=>{
        if(claims && this.roleIsValid(claims))
        {
        }
        else
          this.router.navigate(['home']);
      })
    })
  }

  roleIsValid(claims:Claims) : boolean
  {
    return claims.role===Roles.MANAGER || claims.role===Roles.COACH;
  }

  onSubmit() {
    let term = this.generateTermFromForm();
    this.termService.addTerm(term).subscribe(()=>{
      this.router.navigate(['/terms']);
      this.showSnackbar("Term created.")
    })
  }

  generateTermFromForm() : Term
  {
    let term = new Term();
    term.durationMinutes=this.addTermForm.get('durationMinutes').value;
    term.dayOfWeek=this.addTermForm.get('daysOfWeek').value;
    term.startTime=this.addTermForm.get('startTime').value;
    return term;
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
