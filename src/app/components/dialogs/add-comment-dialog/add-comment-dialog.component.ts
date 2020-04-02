import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-comment-dialog',
  templateUrl: './add-comment-dialog.component.html',
  styleUrls: ['./add-comment-dialog.component.css']
})
export class AddCommentDialogComponent implements OnInit {
  constructor(private dialogRef:MatDialogRef<AddCommentDialogComponent>) { }

  ngOnInit(): void {
  }

  close()
  {
    this.dialogRef.close();
  }

  save(text:string)
  {
    if(text)
      this.dialogRef.close(text);
  }

}
