import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post';
import { AppUserService } from 'src/app/services/app-user-service';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-add-post-dialog',
  templateUrl: './add-post-dialog.component.html',
  styleUrls: ['./add-post-dialog.component.css']
})
export class AddPostDialogComponent implements OnInit {

  constructor(private dialogRef:MatDialogRef<AddPostDialogComponent>,
    private appUserService:AppUserService,private authService:AuthService) { }

  ngOnInit(): void {
  }

  close()
  {
    this.dialogRef.close();
  }

  save(title:string,text:string)
  {
    if(title && text)
      this.appUserService.getByUsername(this.authService.getLoggedInUsername()).subscribe(user=>{
        let post:Post = new Post();
        post.title=title;
        post.text=text;
        post.dateTime = new Date();
        post.appUser=user;
        this.dialogRef.close(post);
      })
  }
}