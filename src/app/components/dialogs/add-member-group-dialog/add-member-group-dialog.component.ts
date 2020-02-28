import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member-group-dialog',
  templateUrl: './add-member-group-dialog.component.html',
  styleUrls: ['./add-member-group-dialog.component.css']
})
export class AddMemberGroupDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddMemberGroupDialogComponent>) { }

  ngOnInit(): void {
  }
  
  close()
  {
    this.dialogRef.close("");
  }

  save(groupName:string)
  {
    if(groupName.trim().length>0)
      this.dialogRef.close(groupName);
  }
}
