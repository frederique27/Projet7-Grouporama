import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken: string;

  constructor(private http: HttpClient,
              private router: Router) { }

  createNewUser(name: string, username: string, email: string, password: string) {
    return new Promise( //
      (resolve, reject) => { 
        this.http.post('http://localhost:3000/api/auth/signup', {name: name, username: username, email: email, password: password}).subscribe(
          (response: { message: string }) => {
            resolve(response);
            this.isAuth$.next(true);
          },
          (error) => {
            reject(error);
          }
        );
      });
  }

  getToken() {
    return this.authToken;
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signin', {email: email, password: password}).subscribe(
        (response: { token: string }) => {
          this.authToken = response.token;
          this.isAuth$.next(true);
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
      this.isAuth$.next(false);
      this.router.navigate(['signin']);
      console.log('user signed out');
  }
}



