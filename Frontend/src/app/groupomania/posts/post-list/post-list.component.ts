import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../models/Posts.model';
import { Like } from '../../models/Likes.model';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
//FONTAWESOME ICONS//
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons';
import { User } from '../../models/Users.model';

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
  likes: Like[];
  userId: string;
  user: User;

  constructor(
    private postsService: PostsService, 
    private authService : AuthService,
    private router: Router
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.getPosts();
    console.log(this.user);
  }

  getPosts(){
    this.postsService.getPosts().subscribe({
      next: posts => this.posts = posts,
      error: error => console.error (error)
    })
  }

  getOnePost(post) {
    this.router.navigate(['/posts', post.id]);
  }

}
