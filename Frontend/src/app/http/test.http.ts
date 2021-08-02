import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { InterfaceHttp } from "./interface.http";
import { Subject } from 'rxjs';
import { Post } from "../groupomania/models/Posts.model";

@Injectable ({ providedIn: 'root'})

export class TestHttp extends InterfaceHttp {
    // signupUser(newUser){
    //     // return this.httpClient.post(`${this.url}auth/signin`, formData)
    //     return this.httpClient.post(`${this.url}auth/signin`, newUser)
    // }
    //  loginUser(loginUser){
    //     // return this.httpClient.post(`${this.url}auth/signin`, formData)
    //     return this.httpClient.post(`${this.url}auth/signin`, loginUser)
    // }

    //POSTS//
    getPost(): Observable<any>{
        return this.httpClient.get(`${this.url}posts`)
    }
    getOnePost(id): Observable<any>{
        return this.httpClient.get(`${this.url}posts/`+id)
    }
    createPost(formData: FormData){
        return this.httpClient.post(`${this.url}posts/new`, formData)
    }

    deletePost(id){
        return this.httpClient.delete(`${this.url}posts/`+id)
    }

    //LIKES//
    likePost(publicationLike, id): Observable<any>{
        return this.httpClient.post(`${this.url}posts/${id}/like`, publicationLike)
    }
    getLikes(id): Observable<any>{
        return this.httpClient.get(`${this.url}posts/${id}/like`, id)
    }

    //COMMENTS//
    newComment(textComment: string, id):Observable<any>{
        return this.httpClient.post(`${this.url}posts/${id}/comment`, {textComment: textComment, postId: id})
    }
    getComments(id):Observable<any>{
        return this.httpClient.get(`${this.url}posts/${id}/comment`)
    }

    //PROFILE//
    getProfile():Observable<any>{
        return this.httpClient.get(`${this.url}profile`)
    }
    editPhoto(formData: FormData):Observable<any>{
        return this.httpClient.put(`${this.url}profile`, formData)
    }
    deleteUser():Observable<any>{
        return this.httpClient.delete(`${this.url}profile`)
    }
} 