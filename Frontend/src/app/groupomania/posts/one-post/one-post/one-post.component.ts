import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../../services/posts.service';
import { Post } from '../../../models/Posts.model';
import { Like } from '../../../models/Likes.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { LikeService } from 'src/app/services/like.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { Location } from '@angular/common';
//FONTAWESOME ICONS//
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-one-post',
  templateUrl: './one-post.component.html',
  styleUrls: ['./one-post.component.css']
})
export class OnePostComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrashAlt;

  post: Post[] = [];
  likes: Like[];
  userId: string;
  id: string
  commentForm: FormGroup;


  constructor(
    private postsService: PostsService, 
    private authService : AuthService,
    private likeService: LikeService,
    private commentService: CommentService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit() {
  this.getOnePost();
  this.initForm();
  }

  getOnePost() {
    this.route.params.forEach((params) => {
        this.postsService.getPostById(params.id)
      .subscribe({
          next: post => this.post = post,
          error: error => console.error (error)
        })

    })
  }

  onDeletePost(post) {
    this.postsService.deletePost(post.id).subscribe(() => {
      this.location.back()
    })
  }  

  // LIKES DISLIKES //
  likeDislike(publicationLike) {
    this.likeService.likePost(publicationLike)
      .subscribe(() => {
        this.getOnePost();
      });
  }

  onLikePost(post) {
    const publicationLike = {
      postId: post.id,
      likes: 1
    };
    this.likeDislike(publicationLike)
  }

  onDislikePost(post) {
    const publicationLike = {
      postId: post.id,
      likes: -1
    };
    this.likeDislike(publicationLike)
  }

  // COMMENTS //
  initForm() {
    this.commentForm = this.formBuilder.group({
      textComment: ['', Validators.required],
    });
  }

  submitComment(event, post) {
    if (event.keyCode === 13) {
      const textComment = this.commentForm.get('textComment').value; 
      this.commentService.newComment(textComment, post.id).subscribe({  
        next: response => console.log(response),
        error: error => console.error (error)
      })
    }
  }
}
