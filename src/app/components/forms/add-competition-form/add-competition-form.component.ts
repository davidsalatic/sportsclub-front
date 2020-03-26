import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { Competition } from 'src/app/models/competition';
import { CompetitionService } from 'src/app/services/competition-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-competition-form',
  templateUrl: './add-competition-form.component.html',
  styleUrls: ['./add-competition-form.component.css']
})
export class AddCompetitionFormComponent implements OnInit {

  addCompetitionForm = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl(''),
    location: new FormControl('',Validators.required),
    dateHeld:new FormControl('',Validators.required),
    startTime:new FormControl('',Validators.required),
  });

  constructor(private authService:AuthService,private router:Router,
    private competitionService:CompetitionService,private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.redirrectIfNotLoggedIn();
  }

  redirrectIfNotLoggedIn()
  {
    if(!this.authService.getToken())
      this.router.navigate(['login']);
  }

  onSubmit() {
    this.addCompetition(this.generateCompetitionFromForm());
  }

  generateCompetitionFromForm() : Competition
  {
    let competition:Competition = new Competition();
    competition.name=this.addCompetitionForm.get('name').value;
    competition.description=this.addCompetitionForm.get('description').value;
    competition.location=this.addCompetitionForm.get('location').value;
    
    let date:Date =this.addCompetitionForm.get('dateHeld').value;
    date.setDate(date.getDate()+1);

    competition.dateHeld=date;
    competition.timeHeld=this.addCompetitionForm.get('startTime').value;

     return competition;
  }

  addCompetition(competition:Competition)
  {
    this.competitionService.addCompetition(competition).subscribe(response=>{
      this.showSnackbar("Competition "+competition.name+" created.");
      this.router.navigate(['competitions']);
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
