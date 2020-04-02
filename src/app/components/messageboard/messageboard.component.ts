import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Post } from 'src/app/models/post';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth-service';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post-service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../dialogs/add-post-dialog/add-post-dialog.component';
import { AppUserService } from 'src/app/services/app-user-service';

@Component({
  selector: 'app-messageboard',
  templateUrl: './messageboard.component.html',
  styleUrls: ['./messageboard.component.css']
})
export class MessageboardComponent implements OnInit {
  displayedColumns = ['user','title','dateTime','actions'];
  dataSource: MatTableDataSource<Post> = new MatTableDataSource();

  loggedInUserId:number;
  numberOfPosts:number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private snackBar:MatSnackBar,private matDialog:MatDialog,
    private authService:AuthService,private router:Router
    ,private postService:PostService,private appUserService:AppUserService)
  {}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    {
      this.loadPosts();
      this.loadLoggedInUserId();
    }
    else
      this.router.navigate(['login']);
  }

  loadPosts()
  {
    this.postService.getAllPosts().subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.numberOfPosts=data.length;
    })
  }

  loadLoggedInUserId()
  {
    this.appUserService.getByUsername(this.authService.getLoggedInUsername()).subscribe(user=>{
      this.loggedInUserId=user.id;
    })
  }

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AddPostDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(post=>{
      if(post)
        this.postService.addPost(post).subscribe(response=>{
          this.showSnackbar("Post created.");
          this.loadPosts();
        })
    })
  }

  deletePost(post:Post)
  {
    if(confirm("Delete post?")) 
      this.postService.deletePost(post.id).subscribe(()=>{
        this.showSnackbar("Post deleted.");
        this.loadPosts();
      })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}