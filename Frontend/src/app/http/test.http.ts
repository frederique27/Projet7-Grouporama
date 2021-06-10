import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { InterfaceHttp } from "./interface.http";
import { Subject } from 'rxjs';
import { Post } from "../groupomania/models/Posts.model";

@Injectable ({ providedIn: 'root'})

export class TestHttp extends InterfaceHttp {
    // posts$ = new Subject<Post[]>();
    getPost(): Observable<any>{
    // getPost(){
        return this.httpClient.get(`${this.url}posts`)
    }
    createPost(formData: FormData){
        return this.httpClient.post(`${this.url}posts/new`, formData)
    }

    deletePost(id){
        return this.httpClient.delete(`${this.url}posts/`+id)
    }

    likePost(publicationLike){
        // return this.httpClient.post(`${this.url}posts/like`, id, likes)
        return this.httpClient.post(`${this.url}posts/like`, publicationLike)
    }

    newComment(formdata: FormData){
        return this.httpClient.post(`${this.url}posts/comment`, formdata)
    }

} 