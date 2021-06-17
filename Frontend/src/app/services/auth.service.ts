import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestHttp } from '../http/test.http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  authToken: string;
  userId: string;

  constructor(private http: HttpClient,
              private testHttp: TestHttp,
              private router: Router) { }

  createNewUser(name: string, username: string, email: string, password: string) {
    return new Promise( //
      (resolve, reject) => { 
        this.http.post('http://localhost:3000/api/auth/signup', {name: name, username: username, email: email, password: password}).subscribe(
          (response: { message: string }) => {
            resolve(response);
            // this.isAuth$.next(true);
          },
          (error) => {
            reject(error);
          }
        );
      });
    // return this.testHttp.signUp({name: name, username: username, email: email, password: password})
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  signInUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signin', {email: email, password: password, withCredentials: true}).subscribe(
        (response: { userId: string, authToken: string }) => {
          this.userId = response.userId;
          this.authToken = response.authToken;
          this.isAuth$.next(true);
          resolve(response);
        },
        (error) => {
          reject(error);
        }
      );
    });
    // return this.testHttp.signIn({email: email, password: password})
  }

  signOutUser() {
      this.authToken = null;
      this.userId = null;
      this.isAuth$.next(false);
      this.router.navigate(['signin']);
      console.log('user signed out');
  }
}



