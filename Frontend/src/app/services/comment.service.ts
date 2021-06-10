import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
  
  constructor(private testHttp: TestHttp) {}


  newComment(textComment: string) {
    const formData: FormData = new FormData()
    formData.append("textPost", textComment)
    return this.testHttp.newComment(formData)
  }

}