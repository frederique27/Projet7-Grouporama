import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { InterfaceHttp } from "./interface.http";
import { Subject } from 'rxjs';
import { Post } from "../groupomania/models/Posts.model";

@Injectable ({ providedIn: 'root'})

export class TestHttp extends InterfaceHttp {
    //AUTH//
    // signUp(name: string, username: string, email: string, password: string){
    //     return this.httpClient.post(`${this.url}auth/signup`, {name: name, username: username, email: email, password: password})
    // }
    // signIn(email: string, password: string){
    //     // return this.httpClient.post(`${this.url}auth/signin`, formData)
    //     return this.httpClient.post(`${this.url}auth/signin`, {email: email, password: password, withCredentials: true})
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

    likePost(publicationLike, id): Observable<any>{
        return this.httpClient.post(`${this.url}posts/${id}/like`, publicationLike)
    }
    getLikes(id): Observable<any>{
        return this.httpClient.get(`${this.url}posts/${id}/like`, id)
    }

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

    getUser():Observable<any>{
        return this.httpClient.get(`${this.url}profile`)
    }

} 