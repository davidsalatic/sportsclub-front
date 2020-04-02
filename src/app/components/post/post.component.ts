import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Comment } from '@angular/compiler';
import { AuthService } from 'src/app/services/auth-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post-service';
import { CommentService } from 'src/app/services/comment-service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddPostDialogComponent } from '../dialogs/add-post-dialog/add-post-dialog.component';
import { AddCommentDialogComponent } from '../dialogs/add-comment-dialog/add-comment-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  dataSource: MatTableDataSource<Comment> = new MatTableDataSource();

  displayedColumns = ['user', 'text','dateTime','actions'];

  post:Post;

  constructor(private authService:AuthService,private router:Router,private matDialog:MatDialog,
    private route:ActivatedRoute,private postService:PostService,private commentService:CommentService){}

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

  openDialog()
  {
    const dialogConfig = new MatDialogConfig();
    let dialogRef = this.matDialog.open(AddCommentDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(comment=>{
      if(comment)
      {
        
      }
    })
  }

  deleteComment(comment:Comment)
  {

  }
}

