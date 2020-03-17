import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auto-generate-sessions-dialog',
  templateUrl: './auto-generate-sessions-dialog.component.html',
  styleUrls: ['./auto-generate-sessions-dialog.component.css']
})
export class AutoGenerateSessionsDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AutoGenerateSessionsDialogComponent>) { }

  ngOnInit(): void {
  }

  close()
  {
    this.dialogRef.close("");
  }

  generateFromToday()
  {
    let today:number = new Date().getDate();
    this.dialogRef.close(today);
  }

  generateThisMonth()
  {
    if(confirm("This will overwrite existing training sessions in this month.")) {
      this.dialogRef.close(1);
    }
  }
}
