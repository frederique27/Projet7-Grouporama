import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
import { Observable, of } from 'rxjs';

@Injectable()
export class PostsService {
  
  constructor(private testHttp: TestHttp) {}

  getPosts() {
    return this.testHttp.getPost()
  }


  createNewPost(textPost: string, photo: File, userId: string) {
    const formData: FormData = new FormData()
    formData.append("image", photo)
    formData.append("textPost", textPost)
    // formData.append("userId", userId)
    // console.log(photo);
    return this.testHttp.createPost(formData)

  }

  deletePost(id) {
    return this.testHttp.deletePost(id)
  }

}