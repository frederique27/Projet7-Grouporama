import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
@Injectable({
	providedIn: 'root'
})
export class LikeService {

	constructor(private testHttp: TestHttp) { }


	likePost(publicationLike, id) {
		return this.testHttp.likePost(publicationLike, id)
	}

	getLikes(id) {
		return this.testHttp.getLikes(id)
	}

}