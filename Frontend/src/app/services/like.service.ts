import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LikeService {
  
  constructor(private testHttp: TestHttp) {}


  likePost(publicationLike) {
    return this.testHttp.likePost(publicationLike)
  }

}