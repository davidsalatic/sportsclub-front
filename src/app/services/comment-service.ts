import { Injectable } from '@angular/core';
import { Routes } from '../const/routes';
import { HttpClient } from '@angular/common/http';
import { Comment } from '@angular/compiler';

@Injectable()
export class CommentService{
    
        private readonly COMMENTS_URL = Routes.SERVER_URL+ '/comments';
    
        constructor(private httpClient: HttpClient){ }
    
        getAllCommentsByPost(postId:number)
        {
            return this.httpClient.get<Comment[]>(this.COMMENTS_URL+"/post/"+postId);
        }
}