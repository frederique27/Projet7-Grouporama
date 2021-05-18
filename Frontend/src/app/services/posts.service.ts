import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models/posts.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class PostsService {

  posts: Post[] = [];
  postsSubject$ = new Subject<Post[]>();
  
  constructor(private http: HttpClient) {}

  getPosts() {
      this.http.get<any>('http://localhost:3000/api/posts').subscribe(
        response => {
          console.log(response);
          this.posts = response;
        }
      );
  }


  createNewPost(textPost: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/posts', {textPost: textPost} ).subscribe(
        (response: { message: string }) => {
          this.postsSubject$.next(this.posts);
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}