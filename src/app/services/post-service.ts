import { Injectable } from '@angular/core';
import { Routes } from '../const/routes';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Role } from '../models/role';
import { Post } from '../models/post';

@Injectable()
export class PostService
{
    private readonly POSTS_URL = Routes.SERVER_URL+ '/posts';

    constructor(private httpClient: HttpClient){ }

    getAllPosts()
    {
        return this.httpClient.get<Post[]>(this.POSTS_URL);
    }

    getPostById(id:number)
    {
        return this.httpClient.get<Post>(this.POSTS_URL+"/"+id);
    }

    addPost(post:Post)
    {
        return this.httpClient.post(this.POSTS_URL,post);
    }

    deletePost(postId:number)
    {
        return this.httpClient.delete(this.POSTS_URL+"/"+postId);
    }
}