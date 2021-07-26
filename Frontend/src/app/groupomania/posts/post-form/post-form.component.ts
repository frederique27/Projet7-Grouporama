import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Posts.model';
import { AuthService } from '../../../services/auth.service'

import tinymce from 'tinymce';
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  photo: string;
  posts: Post[];
  file: File;
  loading = false;


  constructor(
    private formBuilder: FormBuilder, 
    private postsService: PostsService,
    private router: Router,
    private authService : AuthService
    ) { }
              
  ngOnInit() {
    this.loading = true;
    this.initForm();
  }

 
  
  initForm() {
    this.postForm = this.formBuilder.group({
      textPost: ['', Validators.required],
      photo: ''
    });
  }
  
  onSavePost() {
    this.loading = true;
    const textPost = this.postForm.get('textPost').value; 
    const userId = this.authService.getUserId();
    this.postsService.createNewPost(textPost, this.file, userId).subscribe((response)=>{  
      this.loading = false;
      console.log(response)
      // next: response => console.log(response),
      // error: error => console.error (error)
    })
    this.router.navigate(['/posts']);
  }

  detectFiles(files : FileList) {
    const file = files.item(0);
    console.log(file);
    this.file = files.item(0);
  }
}