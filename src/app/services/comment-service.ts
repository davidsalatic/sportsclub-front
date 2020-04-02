import { Injectable } from '@angular/core';
import { Routes } from '../const/routes';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService{
    
    private readonly COMMENTS_URL = Routes.SERVER_URL+ '/comments';

    constructor(private httpClient: HttpClient){ }

    getAllCommentsByPost(postId:number)
    {
        return this.httpClient.get<Comment[]>(this.COMMENTS_URL+"/post/"+postId);
    }

    addComment(comment:Comment)
    {
        return this.httpClient.post(this.COMMENTS_URL,comment);
    }

    deleteComment(commentId:number)
    {
        return this.httpClient.delete(this.COMMENTS_URL+"/"+commentId);
    }
}