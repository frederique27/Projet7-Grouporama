import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from '../../models/post.model';
import { PostsService } from '../../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  // fileIsUploading = false;
  // fileUrl: string;
  // fileUploaded = false;

  constructor(private formBuilder: FormBuilder, private postsService: PostsService,
              private router: Router) { }
              
  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      synopsis: ''
    });
  }
  
  onSavePost() {
    const title = this.postForm.get('title').value;
    const author = this.postForm.get('author').value;
    const synopsis = this.postForm.get('synopsis').value;
    const newPost = new Post(title, author);
    // if(this.fileUrl && this.fileUrl !== '') {
    //   newPost.photo = this.fileUrl;
    // }
    newPost.synopsis = synopsis;
    this.postsService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }

  // onUploadFile(file: File) {
  //   this.fileIsUploading = true;
  //   this.postsService.uploadFile(file).then(
  //     (url: string) => {
  //       this.fileUrl = url;
  //       this.fileIsUploading = false;
  //       this.fileUploaded = true;
  //     }
  //   );
  // }

  // detectFiles(event) {
  //   this.onUploadFile(event.target.files[0]);
  // }
}


