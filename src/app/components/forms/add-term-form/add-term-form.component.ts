import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Term } from 'src/app/models/term';
import { TermService } from 'src/app/services/term-service';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MemberGroup } from 'src/app/models/member-group';
import { TitleService } from 'src/app/services/title-service';

@Component({
  selector: 'app-add-term-form',
  templateUrl: './add-term-form.component.html',
  styleUrls: ['./add-term-form.component.css']
})
export class AddTermFormComponent implements OnInit {
  
  daysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  memberGroup:MemberGroup;

  addTermForm = new FormGroup({
    durationMinutes: new FormControl('',Validators.required),
    daysOfWeek: new FormControl('',Validators.required),
    startTime:new FormControl('',Validators.required)
  });

  constructor(private router:Router,private snackBar:MatSnackBar,private authService:AuthService
    ,private termService:TermService,private route:ActivatedRoute,
    private memberGroupService:MemberGroupService,private titleService:TitleService) { 
      this.titleService.changeTitle("Add a new term")
    }

  ngOnInit(): void {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
      if(this.authService.isCoachOrManagerLoggedIn())
      {            
        let memberGroupId=this.route.snapshot.params['groupId'];
        this.loadMemberGroup(memberGroupId);
      }
      else
        this.router.navigate(['home']);
    else
      this.router.navigate(['login']);
  }

  loadMemberGroup(memberGroupId:number)
  {
    this.memberGroupService.getGroupById(memberGroupId).subscribe(group=>{
      this.memberGroup=group;
    })
  }

  onSubmit() {
    let term = this.generateTermFromForm();
    this.termService.addTerm(term).subscribe(()=>{
      this.router.navigate(['/terms/group/'+this.memberGroup.id]);
      this.showSnackbar("Term created.")
    })
  }

  generateTermFromForm() : Term
  {
    let term = new Term();
    term.durationMinutes=this.addTermForm.get('durationMinutes').value;
    term.dayOfWeek=this.addTermForm.get('daysOfWeek').value;
    term.startTime=this.addTermForm.get('startTime').value;
    term.memberGroup=this.memberGroup;
    return term;
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}
