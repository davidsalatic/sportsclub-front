import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-apply-competition-form',
  templateUrl: './apply-competition-form.component.html',
  styleUrls: ['./apply-competition-form.component.css']
})
export class ApplyCompetitionFormComponent implements OnInit {

  applyForm = new FormGroup({
    message: new FormControl('')
  });

  competitionId:number;

  constructor(private authService:AuthService,private snackBar:MatSnackBar
    ,private route:ActivatedRoute,private router:Router) { }



  ngOnInit(): void {
    this.competitionId=this.route.snapshot.params['id'];
    if(this.authService.getToken())
    {

    }
    else
    {
      this.showSnackbar("Log in to apply for this competition.");
      this.authService.setRouteAfterLogin('competitions/'+this.competitionId+"/apply");
      this.router.navigate(['login']);
    }
  }

  onSubmit()
  {
    //TODO
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 3000
    })
  }

}
