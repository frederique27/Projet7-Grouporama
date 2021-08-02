import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/groupomania/models/Users.model';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

	signupForm: FormGroup;
	errorMessage: string;
	user: User;

	constructor(private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router) {
		this.user = new User();
	}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.signupForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			username: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
			profilePic: ['']
		});
	}

	onSubmit() {
		const user = {
			name: this.signupForm.get('name').value,
			username: this.signupForm.get('username').value,
			email: this.signupForm.get('email').value,
			password: this.signupForm.get('password').value,
			profilePic: this.signupForm.get('profilePic').value
		}

		this.authService.createNewUser(user).then(
			() => {
				Swal.fire({
					title: 'Compte créé!',
					text: 'Veuillez vous connecter',
					icon: 'success',
					timer: 2000
				})
				setTimeout(() => {
					this.router.navigate(['auth/signin']);
				}, 3000);
				// this.router.navigate(['auth/signin']);
			},
			(error) => {
				this.errorMessage = JSON.stringify(error.error);
			}
		);
	}
}