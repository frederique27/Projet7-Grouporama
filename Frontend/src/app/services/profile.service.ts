import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
@Injectable()
export class ProfileService {
  
  constructor(private testHttp: TestHttp) {}

  getProfile() {
    return this.testHttp.getProfile()
  }

}