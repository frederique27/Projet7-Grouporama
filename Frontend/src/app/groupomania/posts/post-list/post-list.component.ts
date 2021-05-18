import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/Posts.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
// export class PostListComponent implements OnInit, OnDestroy {
  export class PostListComponent implements OnInit {

  posts: Post[];
  postsSubscription: Subscription;

  constructor(private postsService: PostsService, private router: Router) {}

  ngOnInit() {
    this.postsService.getPosts();
  }


}