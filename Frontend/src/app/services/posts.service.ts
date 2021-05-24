import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
@Injectable()
export class PostsService {
  
  constructor(private testHttp: TestHttp) {}

  getPosts() {
    return this.testHttp.getTest()
  }


  createNewPost(textPost: string, photo: File) {
    const formData: FormData = new FormData()
    formData.append("image", photo)
    formData.append("textPost", textPost)
    console.log(photo);
    return this.testHttp.postTest(formData)

  }

}