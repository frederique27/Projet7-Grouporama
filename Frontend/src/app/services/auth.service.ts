import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TestHttp } from '../http/test.http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../groupomania/models/Users.model';
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  authToken: string;
  userId: string;
  user: User[]
  // private userSubject: BehaviorSubject<User>;
  // public user: Observable<User>;

  constructor(private http: HttpClient,
              private testHttp: TestHttp,
              private router: Router) { 
                // this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
                // this.user = this.userSubject.asObservable();
              }

  createNewUser(user) {
    return new Promise(
      (resolve, reject) => { 
        this.http.post('http://localhost:3000/api/auth/signup', user).subscribe(
          (response) => {
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    // return this.testHttp.signUp({name: name, username: username, email: email, password: password})
  }

  signInUser(user) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:3000/api/auth/signin', user).subscribe(
        (response: { userId: string, authToken: string }) => {
          this.userId = response.userId;
          this.authToken = response.authToken;
          this.isAuth$.next(true);
          this.user = user;
          localStorage.setItem('token', this.authToken);
          localStorage.setItem('user', JSON.stringify(user));
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
      this.user = null;
      localStorage.clear();
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }
}

  // createNewUser(name, username, email, password) {
  //   return this.testHttp.signUp(name, username, email, password)
  //   // (response: { message: string }) => {
  //   //         resolve(response);
  //   //         this.isAuth$.next(true);
  //   //       // (user) => {
  //   //       //   this.user = user
  //   //       //   this.isAuth$.next(true);
  //   //       },
  //   //       (error) => {
  //   //         reject(error);
  //   //       }
  //   //     );
  //   //   });
  //   // return this.testHttp.signUp({name: name, username: username, email: email, password: password})
  // }

    //   signInUser(email: string, password: string) {
  //   // return new Promise((resolve, reject) => {
  //     return this.http.post<any>('http://localhost:3000/api/auth/signin', {email: email, password: password})
  //     .pipe(map(user => {
  //       // user.authdata = window.btoa(username + ':' + password);
  //       localStorage.setItem('user', JSON.stringify(user));
  //       this.userSubject.next(user);
  //       return user;
  //   }));
  // }

  // signInUser(email, password) {
    // const formData: FormData = new FormData()
    // formData.append("email", email)
    // formData.append("password", password)
      // return this.testHttp.signIn(email, password)
    //   .subscribe(
    //     (response: { userId: string, authToken: string }) => {
    //       this.userId = response.userId;
    //       this.authToken = response.authToken;
    //       this.isAuth$.next(true);
    //       user => this.user = user
    //       resolve(response);
    //     },
    //     (error) => {
    //       reject(error);
    //     }
    //   );
    // });
    // return this.testHttp.signIn({email: email, password: password})
  // }



