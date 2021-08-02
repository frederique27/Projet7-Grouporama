import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TestHttp } from '../http/test.http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
	providedIn: 'root'
})
export class AuthService {
	headers: HttpHeaders;

	isAuth$ = new BehaviorSubject<boolean>(false);
	private authToken: string;
	private userId: string;
	private name: string;
	private isAdmin: boolean;
	success: boolean
	private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false')


	constructor(private http: HttpClient,
		private testHttp: TestHttp,
		private router: Router) {
	}

	setLoggedIn(value: boolean) {
		this.loggedInStatus = value
		localStorage.setItem('loggedIn', 'true')
	}

	get isLoggedIn() {
		return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus.toString())
	}

	signInUser(user) {
		return new Promise((resolve, reject) => {
			return this.http.post<any>('http://localhost:4200/api/auth/signin', user).subscribe(
				(response: { userId: string, authToken: string, isAdmin: boolean }) => {
					this.userId = response.userId;
					this.authToken = response.authToken;
					this.isAdmin = response.isAdmin;
					this.isAuth$.next(true);
					sessionStorage.setItem('TOKEN', this.authToken);
					sessionStorage.setItem('USER_ID', this.userId);
					sessionStorage.setItem('IS_ADMIN', String(this.isAdmin));
					resolve(response);
					return user;
				},
				(error) => {
					reject(error);
				}
			);
		});
	}

	createNewUser(user) {
		return new Promise(
			(resolve, reject) => {
				this.http.post('http://localhost:4200/api/auth/signup', user).subscribe(
					(response) => {
						resolve(response);
					},
					(error) => {
						reject(error);
					}
				);
			});
	}

	signOutUser() {
		this.authToken = null;
		this.userId = null;
		this.isAuth$.next(false);
		this.router.navigate(['/auth/signin']);
		console.log('user signed out');
		sessionStorage.removeItem('TOKEN');
		sessionStorage.removeItem('USER_ID');
		sessionStorage.removeItem('IS_ADMIN');
	}

	getToken() {
		if (this.authToken) {
			this.isAuth$.next(true);
			return this.authToken;
		} else {
			this.authToken = sessionStorage.getItem('TOKEN');
			if (this.authToken) {
				this.isAuth$.next(true);
			} else {
				this.isAuth$.next(false);
			}
			return this.authToken;
		}
	}

	getUserId() {
		if (this.userId) {
			return this.userId;
		} else {
			this.userId = sessionStorage.getItem('USER_ID');
			return this.userId;
		}
	}

	getIsAdmin() {
		if (this.isAdmin) {
			return this.isAdmin;
		} else {
			this.isAdmin = sessionStorage.getItem('IS_ADMIN') === '1';
			return this.isAdmin;
		}
	}
}