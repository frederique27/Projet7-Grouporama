import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../models/Posts.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

// export class PostListComponent implements OnInit, OnDestroy {
  export class PostListComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrashAlt;
  posts: Post[];
  userId: string;
  id: number;
  postSub: Subscription;
  posts$ = new Subject<Post[]>();


  constructor(
    private postsService: PostsService, 
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    // this.postsService.getPosts().subscribe({
    //   next: posts => this.posts = posts,
    //   error: error => console.error (error)
    // })
    this.postSub = this.posts$.subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
    this.postsService.getPosts().subscribe(
      (posts: Post[]) => {
        this.posts$.next(posts);
      },
      (error) => {
        this.posts$.next([]);
        console.error(error);
      }
    );
  }

  // public onDeletePost(id: number): void {
  //   // const postId: number = parseInt(event.target[0].value, 10);
  //   // console.log(postId);
  //   this.postsService.deletePost(id)
  //     .subscribe({
  //       next: response => console.log(response),
  //       error: error => console.error (error)
  //     })
  //     // console.log('LE' + id);
  // }
  // onDeletePost() {
  //   this.postsService.deletePost(this.posts.id).subscribe({
  //     next: response => console.log(response),
  //     error: error => console.error (error)
  //   })
  // }


}
