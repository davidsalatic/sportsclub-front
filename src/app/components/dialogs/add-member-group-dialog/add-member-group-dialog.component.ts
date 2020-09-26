import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberGroupService } from 'src/app/services/member-group-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MemberGroup } from 'src/app/models/member-group';

@Component({
  selector: 'app-add-member-group-dialog',
  templateUrl: './add-member-group-dialog.component.html',
  styleUrls: ['./add-member-group-dialog.component.css']
})
export class AddMemberGroupDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<AddMemberGroupDialogComponent>
    , private memberGroupService: MemberGroupService, private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public existingName: string) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close("");
  }

  save(groupName: string) {
    if (groupName.trim().length > 0) {
      this.memberGroupService.getGroupByName(groupName).subscribe(group => {
        if (group)
          this.showSnackbar("A member group with that name already exists!");
        else
          this.dialogRef.close(groupName);
      })
    }
  }

  showSnackbar(message: string) {
    this.snackBar.open(message, "X", {
      duration: 1500
    })
  }
}
