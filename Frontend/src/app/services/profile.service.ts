import { Injectable } from '@angular/core';
import { TestHttp } from '../http/test.http';
@Injectable()
export class ProfileService {

	constructor(private testHttp: TestHttp) { }

	getProfile() {
		return this.testHttp.getProfile()
	}

	editPhoto(profilePic: File) {
		const formData: FormData = new FormData()
		formData.append("image", profilePic)
		return this.testHttp.editPhoto(formData)

	}

	deleteUser() {
		return this.testHttp.deleteUser()
	}
}