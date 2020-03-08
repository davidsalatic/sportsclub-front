import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-training-session-dialog',
  templateUrl: './add-training-session-dialog.component.html',
  styleUrls: ['./add-training-session-dialog.component.css']
})
export class AddTrainingSessionDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddTrainingSessionDialogComponent>){}

  ngOnInit(): void {
  }

  close()
  {
    this.dialogRef.close("");
  }

  save(date:Date)
  {
    if(date)
    {
      this.dialogRef.close(date);
    }
  }
}
