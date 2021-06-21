import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
// import { User } from 'src/app/groupomania/models/Users.model';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;
  // users: User[];
  // isAuth$ = new BehaviorSubject<boolean>(false);
  // authToken: string;
  // userId: string;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  // onSubmit() {
  //   const email = this.signInForm.get('email').value;
  //   const password = this.signInForm.get('password').value;
    
  //   this.authService.signInUser(email, password).subscribe(
  //     {
  //           next: 
  //           (response: { userId: string, authToken: string }) => {
  //                   this.userId = response.userId;
  //                   this.authToken = response.authToken;
  //                   this.isAuth$.next(true);
  //                   user => this.users = user
  //                   this.router.navigate(['/posts']);
        
  //         },
  //         error: error => console.error (error)
  //       })
  //       this.router.navigate(['/posts']);

    //         next: (response: { userId: string, authToken: string }) => {
    //           this.userId = response.userId;
    //           this.authToken = response.authToken;
    //           this.isAuth$.next(true);
    //           // user => this.users = user
    //           console.log(this.users);
    //           // this.router.navigate(['/posts']);
    //         },
    //         (error) => {
    //           console.error(error);
    //         }
    // )
    // this.router.navigate(['/posts']);
  // }
        // });
    //   { next: () => this.router.navigate(['/posts']),
    //   error: error => console.error (error)
    // }
      // () => {
      //   this.router.navigate(['/posts']);
      // },
      // (error) => {
      //   this.errorMessage = error;
      // }
    // );
    // this.router.navigate(['/posts']);
  // }

  // getToken() {
  //   return this.authToken;
  // }

  // getUserId() {
  //   return this.userId;
  // }
//   signOutUser() {
//     this.authToken = null;
//     this.userId = null;
//     this.isAuth$.next(false);
//     this.router.navigate(['signin']);
//     console.log('user signed out');
// }

  onSubmit() {
    const user = {
      email: this.signInForm.get('email').value,
      password: this.signInForm.get('password').value
    }
    // const email = this.signInForm.get('email').value;
    // const password = this.signInForm.get('password').value;
    
    this.authService.signInUser(user).then(
      (data) => {
        this.router.navigate(['/posts']);
        // this.authService.storeUserData(data.token, data.user);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}

// onSubmit() {
//   const email = this.signInForm.get('email').value;
//   const password = this.signInForm.get('password').value;

//   this.authService.signInUser(email, password).subscribe({
//     next: (response: { userId: string, authToken: string }) => {
//             this.userId = response.userId;
//             this.authToken = response.authToken;
//             this.isAuth$.next(true);
//             this.router.navigate(['/posts']);

//   }
//   error: error => console.error (error)
// })
// }
