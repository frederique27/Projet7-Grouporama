import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../models/Posts.model';
import { Like } from '../../models/Likes.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ProfileService } from '../../../services/profile.service';
//FONTAWESOME ICONS//
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { User } from '../../models/Users.model';
import { OnePostComponent } from '../one-post/one-post/one-post.component';
import { LikeService } from 'src/app/services/like.service';

@Component({ 
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

  export class PostListComponent implements OnInit {
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faTrash = faTrashAlt;
  faCommentAlt = faCommentAlt;

  posts: Post[];
  comments: Comment[];
  likes: Like[];
  userId: string;
  user: User;

  constructor(
    private postsService: PostsService, 
    private authService : AuthService,
    private likeService : LikeService,
    private router: Router,
    // private onePostComponent: OnePostComponent
  ) {
    this.user = this.authService.userValue;
    // this.user = this.profileService.getProfile;
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.getPosts();
    console.log(this.user);
  }

  getPosts(){
    this.postsService.getPosts().subscribe((posts)=>{
      this.posts = posts
      // this.onePostComponent.getLikes()
      // next: posts => this.posts = posts,
      // error: error => console.error (error)
    })
  }

  getOnePost(post) {
    this.router.navigate(['/posts', post.id]);
  }

  getLikes(post) {
    this.likeService.getLikes(post.id).subscribe({
      next: like => this.likes = like,
      error: error => console.error (error)
    })
  }

  getUser() {
    this.postsService.getUser().subscribe({
      next: user => this.user = user,
      error: error => console.error (error)
    })
  }

}
