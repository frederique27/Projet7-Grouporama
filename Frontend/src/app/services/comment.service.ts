import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
@Injectable({
	providedIn: 'root'
})
export class CommentService {

	constructor(private testHttp: TestHttp) { }


	newComment(textComment, id) {
		return this.testHttp.newComment(textComment, id)
	}

	getComments(id: string) {
		return this.testHttp.getComments(id)
	}

}