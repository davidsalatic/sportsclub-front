import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { CompetitionService } from 'src/app/services/competition-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Competition } from 'src/app/models/competition';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-edit-competition-form',
  templateUrl: './edit-competition-form.component.html',
  styleUrls: ['./edit-competition-form.component.css']
})
export class EditCompetitionFormComponent implements OnInit {

  competition:Competition;
  loggedIn:string;

  editCompetitionForm = new FormGroup({
    name: new FormControl('',Validators.required),
    description: new FormControl(''),
    location: new FormControl('',Validators.required),
    dateHeld:new FormControl('',Validators.required),
    startTime:new FormControl('',Validators.required)
  });

  constructor(private authService:AuthService,private router:Router,private titleService:TitleService,
    private competitionService:CompetitionService,private snackBar:MatSnackBar,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }
    
  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    {
      this.loggedIn=this.authService.getLoggedInRole();
      if(this.authService.isMemberLoggedIn())
        this.disableFormFields();
      let competitionId=this.route.snapshot.params['id'];
      this.loadCompetition(competitionId);
    }
    else
      this.router.navigate(['login']);
  }

  disableFormFields(){
    this.editCompetitionForm = new FormGroup({
      name: new FormControl({value:'',disabled:true}),
      description: new FormControl({value:'',disabled:true}),
      location: new FormControl({value:'',disabled:true}),
      dateHeld:new FormControl({value:'',disabled:true}),
      startTime:new FormControl({value:'',disabled:true})
    });
  }

  loadCompetition(competitionId:number)
  {
    this.competitionService.getCompetitionById(competitionId).subscribe(comp=>{
      this.competition=comp;
      this.titleService.changeTitle(""+this.competition.name);
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

  deleteCompetition()
  {
    if(confirm("Delete competition '"+this.competition.name+"'?")) 
      this.competitionService.deleteCompetition(this.competition.id).subscribe(()=>{
        this.showSnackbar("Competition "+this.competition.name+" deleted.");
        this.navigateToCompetitions();
      })
  }

  updateCompetition()
  {
    this.competitionService.updateCompetition(this.competition).subscribe(response=>{
      this.showSnackbar("Competition updated.");
      this.navigateToCompetitions();
    })
  }

  navigateToCompetitions()
  {
    this.router.navigate(['competitions']);
  }

  sendInvitations()
  {
    if(confirm("Invite all members to competition '"+this.competition.name+"'?"))
      this.competitionService.sendInvitations(this.competition).subscribe(response=>{
        this.showSnackbar("Email invitations sent.");
        this.navigateToCompetitions();
      })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
