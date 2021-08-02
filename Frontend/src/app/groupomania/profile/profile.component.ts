import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from '../models/Users.model';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
	user: User;
	file: File;
	profilePic: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private profileService: ProfileService,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.getProfile()
		this.profilePic = this.formBuilder.group({
			profilePic: ['', Validators.required],
		});
	}

	getProfile() {
		this.profileService.getProfile().subscribe({
			next: user => this.user = user,
			error: error => console.error(error)
		})
	}

	detectFiles(files: FileList) {
		this.file = files.item(0);
		console.log(this.file);
		this.profileService.editPhoto(this.file).subscribe({
			next: res => this.getProfile(),
			error: error => console.error(error)
		})
	}

	deleteUser() {
		this.profileService.deleteUser().subscribe(() => {
			this.authService.signOutUser()
		})
	}
}
