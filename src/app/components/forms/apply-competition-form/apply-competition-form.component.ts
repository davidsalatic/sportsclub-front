import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUserService } from 'src/app/services/app-user-service';
import { CompetitionService } from 'src/app/services/competition-service';
import { Competition } from 'src/app/models/competition';
import { CompetitionApplication } from 'src/app/models/competition-application';
import { CompetitionApplicationService } from 'src/app/services/competition-application-service';
import { AppUser } from 'src/app/models/app-user';

@Component({
  selector: 'app-apply-competition-form',
  templateUrl: './apply-competition-form.component.html',
  styleUrls: ['./apply-competition-form.component.css']
})
export class ApplyCompetitionFormComponent implements OnInit {

  applyForm = new FormGroup({
    message: new FormControl('')
  });

  alreadyApplied:boolean=false;
  competition:Competition;
  appUser:AppUser;

  constructor(private authService:AuthService,private snackBar:MatSnackBar
    ,private route:ActivatedRoute,private router:Router,private appUserService:AppUserService,
    private competitionService:CompetitionService,
    private competitionApplicationService:CompetitionApplicationService) { }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    let competitionId=this.route.snapshot.params['id'];
    if(this.authService.getToken())
      if(this.authService.isMemberLoggedIn())    
      {
        this.loadCompetition(competitionId);
        this.checkIfAlreadyApplied(competitionId);
      }
      else
        this.router.navigate(['home']);
    else
    {
      this.showSnackbar("Log in to apply for this competition.");
      this.authService.setRouteAfterLogin('competitions/'+competitionId+"/apply");
      this.router.navigate(['login']);
    }
  }

  loadCompetition(id:number)
  {
    this.competitionService.getCompetitionById(id).subscribe(comp=>{
      this.competition=comp;
    })
  }

  checkIfAlreadyApplied(competitionId:number)
  {
    this.authService.extractClaims(this.authService.getToken()).subscribe(claims=>{
      if(claims)
      this.appUserService.getByUsername(claims.sub).subscribe(user=>{
        if(user)
        {
          this.appUser=user;
          this.competitionApplicationService.getByCompetitionAndAppUser(competitionId,user.id).subscribe(application=>{
            if(application)
              this.alreadyApplied=true;//show button for cancel application
            else
              this.alreadyApplied=false;//show form for competition application
          })
        }
      })
    })

  }

  onSubmit()
  {
    this.createCompetitionApplicationAndApply();
  }

  createCompetitionApplicationAndApply()
  {
    let application: CompetitionApplication = new CompetitionApplication();
    this.authService.extractClaims(this.authService.getToken()).subscribe(claims=>{
      this.appUserService.getByUsername(claims.sub).subscribe(member=>{
        application.appUser=member;
        application.message=this.applyForm.get('message').value;
        application.competition=this.competition;
        this.competitionApplicationService.addCompetitionApplication(application).subscribe(response=>{
          this.showSnackbar("Applied for competition.");
          this.router.navigate(['home']);
        })
      })
    })
  }

  cancelApplication()
  {
    if(confirm("Cancel your application to attend '"+this.competition.name+"'?")) {
      this.competitionApplicationService.getByCompetitionAndAppUser(this.competition.id,this.appUser.id).subscribe(compApplication=>{
        this.competitionApplicationService.deleteCompetitionApplication(compApplication).subscribe(response=>{
          this.showSnackbar("Application canceled.");
          this.router.navigate(['competitions']);
        })
      })
    }
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 3000
    })
  }

}
