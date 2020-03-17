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
    if(confirm("This will delete existing training sessions from today to the end of the month and recreate them. All attendances in that period will be lost!"))
    {
      let today:number = new Date().getDate();
      this.dialogRef.close(today);
    }
  }

  generateThisMonth()
  {
    if(confirm("This will delete existing training sessions in this month and recreate them. All attendances in this month will be lost!")) {
      this.dialogRef.close(1);
    }
  }
}
