import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionService } from 'src/app/services/competition-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Competition } from 'src/app/models/competition';

@Component({
  selector: 'app-edit-competition-form',
  templateUrl: './edit-competition-form.component.html',
  styleUrls: ['./edit-competition-form.component.css']
})
export class EditCompetitionFormComponent implements OnInit {

  competition:Competition;

  editCompetitionForm = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl(''),
    location: new FormControl('',Validators.required),
    dateHeld:new FormControl('',Validators.required),
    startTime:new FormControl('',Validators.required),
  });

  constructor(private authService:AuthService,private router:Router,
    private competitionService:CompetitionService,private snackBar:MatSnackBar,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }
    
  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {            
        let competitionId=this.route.snapshot.params['id'];
        this.loadCompetition(competitionId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadCompetition(competitionId:number)
  {
    this.competitionService.getCompetitionById(competitionId).subscribe(comp=>{
      this.competition=comp;
      this.updateFormWithCompetitionData();
    })
  }

  updateFormWithCompetitionData()
  {
    this.editCompetitionForm.patchValue({
      name: this.competition.name,
      description: this.competition.description,
      location: this.competition.location,
      dateHeld:this.competition.dateHeld,
      startTime:this.competition.timeHeld
    });
  }

  onSubmit()
  {
    this.competition.name=this.editCompetitionForm.get('name').value;
    this.competition.description=this.editCompetitionForm.get('description').value;
    this.competition.location=this.editCompetitionForm.get('location').value;
    this.competition.timeHeld=this.editCompetitionForm.get('startTime').value;

    let formDate : Date =this.editCompetitionForm.get('dateHeld').value;
    //if date has changed
    if(formDate!=this.competition.dateHeld)
    {
      formDate.setDate(formDate.getDate()+1);
      this.competition.dateHeld=formDate;
    }
    else
      this.competition.dateHeld=this.editCompetitionForm.get('dateHeld').value;


    this.updateCompetition();
  }

  updateCompetition()
  {
    this.competitionService.updateCompetition(this.competition).subscribe(response=>{
      this.showSnackbar("Competition updated.")
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
