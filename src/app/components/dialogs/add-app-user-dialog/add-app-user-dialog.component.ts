import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-app-user-dialog',
  templateUrl: './add-app-user-dialog.component.html',
  styleUrls: ['./add-app-user-dialog.component.css']
})
export class AddAppUserDialogComponent implements OnInit {

  dateJoined:Date;

  constructor() { }

  ngOnInit(): void {
  }

  save()
  {
    console.log(this.dateJoined);
  }

  

}
