import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../../models/Posts.model';

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


  constructor(private formBuilder: FormBuilder, private postsService: PostsService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.postForm = this.formBuilder.group({
      textPost: ['', Validators.required],
      photo: ''
    });
  }
  
  onSavePost() {
    const textPost = this.postForm.get('textPost').value; 
    this.postsService.createNewPost(textPost, this.file).subscribe({  
      next: response => console.log(response),
      error: error => console.error (error)
    })
    this.router.navigate(['/posts']);
  }

  detectFiles(files : FileList) {
    const file = files.item(0);
    console.log(file);
    this.file = files.item(0);
    // this.postForm.get('photo').setValue(file);
    // this.postForm.updateValueAndValidity();
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.photo = reader.result as string;
    // };
    // reader.readAsDataURL(file);
  }
}