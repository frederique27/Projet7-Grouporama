import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/groupomania/models/Users.model';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

	user: User;
	error: boolean;
	authUser: boolean

	signInForm: FormGroup;
	errorMessage: string;
	fieldTextType: boolean;

	constructor(private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router) {
		this.user = new User();
	}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.signInForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
		});
	}

	onSubmit() {
		const user = {
			email: this.signInForm.get('email').value,
			password: this.signInForm.get('password').value
		}
		this.authService.signInUser(user).then(
			() => {
				Swal.fire({
					text: 'Authentification réussi',
					icon: 'success',
					timer: 2000
				})
				setTimeout(() => {
					this.router.navigate(['/posts']);
				}, 3000)
			},
			(error) => {
				this.errorMessage = JSON.stringify(error.error);
			}
		);
	}
}
