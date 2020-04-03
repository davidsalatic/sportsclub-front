import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment';
import { PostService } from 'src/app/services/post-service';
import { CommentService } from 'src/app/services/comment-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCommentDialogComponent } from '../dialogs/add-comment-dialog/add-comment-dialog.component';
import { Post } from 'src/app/models/post';
import { AppUserService } from 'src/app/services/app-user-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})

export class PostComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Comment> = new MatTableDataSource();

  displayedColumns = ['user','dateTime','actions'];

  post:Post;
  loggedInUserId:number;
  numberOfComments:number;

  constructor(private authService:AuthService,private router:Router,private matDialog:MatDialog,
    private route:ActivatedRoute,private postService:PostService,private commentService:CommentService
    ,private appUserService:AppUserService, private snackBar:MatSnackBar){}

  ngOnInit() {
    this.loadPageIfValidRole();
  }

  loadPageIfValidRole()
  {
    if(this.authService.getToken())
    {
      let postId:number = this.route.snapshot.params['id'];
      this.loadPost(postId);
      this.loadComments(postId);
      this.loadLoggedInUserId();
    }
    else
      this.router.navigate(['login']);
  }

  loadPost(postId:number)
  {
    this.postService.getPostById(postId).subscribe(post=>{
      this.post=post;
    })
  }

  loadComments(postId:number)
  {
    this.commentService.getAllCommentsByPost(postId).subscribe(data=>{
      this.dataSource.data=data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
    let dialogRef = this.matDialog.open(AddCommentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(text=>{
      if(text)
        this.appUserService.getByUsername(this.authService.getLoggedInUsername()).subscribe(user=>{
          let comment:Comment = new Comment();
          comment.text=text;
          comment.dateTime=new Date();
          comment.appUser=user;
          comment.post=this.post;
          this.addComment(comment);
        })
    })
  }

  addComment(comment:Comment)
  {
    this.commentService.addComment(comment).subscribe(response=>{
      this.showSnackbar("Comment posted.");
      this.loadComments(this.post.id);
    })
  }

  deleteComment(comment:Comment)
  {
    if(confirm("Delete comment?")) 
    this.commentService.deleteComment(comment.id).subscribe(response=>{
      this.showSnackbar("Comment removed.");
      this.loadComments(this.post.id);
    })
  }

  showSnackbar(message:string)
  {
    this.snackBar.open(message, "X",{
      duration: 1500
    })
  }
}

