import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../models/Posts.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from '../../../services/auth.service';
import { LikeService } from 'src/app/services/like.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

  export class PostListComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrashAlt;

  posts: Post[];
  userId: string;
  id: number;
  likes: number;
  postSub: Subscription;
  posts$ = new Subject<Post[]>();

  //COMMENTS//
  commentForm: FormGroup;


  constructor(
    private postsService: PostsService, 
    private authService : AuthService,
    private likeService: LikeService,
    private commentService: CommentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.getPosts();
    this.initForm();
  }

  getPosts(){
    this.postsService.getPosts().subscribe({
      next: posts => this.posts = posts,
      error: error => console.error (error)
    })
  }

  onDeletePost(post) {
    this.postsService.deletePost(post.id).subscribe({
      next: res => this.getPosts(),
      error: error => console.error (error)
    })
  }
 
  // onLikePost(post){
  // console.log(post.id);
  // console.log(post.likes);
  // console.log(this.userId);
  //   this.likeService.likePost(this.userId, post.id).subscribe({
  //     next: res => this.postsService.getPosts(),
  //     // next: res => console.log("you liked this post"),
  //     error: error => console.error (error)
  //   })
  // }
  
  // onPublicationLike(idPublication: number): void {
  //   const publicationLike = {
  //     idpublication: idPublication,
  //     like: 1
  //   };
  //   if (this.publication.likeValue) {
  //     publicationLike.like = 0;
  //   }
  //   this.likeService.postLikePublication(publicationLike)
  //     .subscribe(() => {
  //       this.publicationService.getPublications();
  //     });
  // }
  onLikePost(post) {
    const publicationLike = {
      postId: post.id,
      likes: 1
    };
    if (post.likes) {
      publicationLike.likes = 0;
    }
    this.likeService.likePost(publicationLike)
      .subscribe(() => {
        this.postsService.getPosts();
      });
  }

  onDislikePost(post) {
    const publicationLike = {
      postId: post.id,
      likes: -1
    };
    if (post.likes) {
      publicationLike.likes = 0;
    }
    this.likeService.likePost(publicationLike)
      .subscribe(() => {
        this.postsService.getPosts();
      });
  }

  // onDislikePost(post){
  //   const dislikes = this.nbOfDislikes ++;
  //   this.likeService.likePost(post.id, dislikes).subscribe({
  //     next: res => this.postsService.getPosts(),
  //     error: error => console.error (error)
  //   })
  // }
  initForm() {
    this.commentForm = this.formBuilder.group({
      textComment: ['', Validators.required],
    });
  }

  submitComment(event) {
    if (event.keyCode === 13) {
      alert('you just pressed the enter key');
      const textComment = this.commentForm.get('textComment').value; 
      // const userId = this.authService.getUserId();
      this.commentService.newComment(textComment).subscribe({  
        next: response => console.log(response),
        error: error => console.error (error)
      })
    }
  }
}
