import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../../models/Posts.model';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder, private postsService: PostsService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.postForm = this.formBuilder.group({
      textPost: ['', Validators.required],
      // photo: ''
    });
  }
  
  onSavePost() {
    const textPost = this.postForm.get('textPost').value;
    console.log(textPost);
    // const newPost = new Post(textPost);
    this.postsService.createNewPost((textPost)).then(
      () => {
        this.router.navigate(['/posts']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
    // this.router.navigate(['/posts']);
  }
}

// createNewPost(newPost: Post) {
  //   this.posts.push(newPost);
  //   this.postsSubject$.next(this.posts);
  // }


