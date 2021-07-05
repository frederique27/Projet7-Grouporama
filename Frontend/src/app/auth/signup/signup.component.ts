import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/groupomania/models/Users.model';
// import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  // isAuth$ = new BehaviorSubject<boolean>(false);
  // user: User[];

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit() {
    const user = {
      name: this.signupForm.get('name').value,
      username: this.signupForm.get('username').value,
      email: this.signupForm.get('email').value,
      password: this.signupForm.get('password').value,
    }
    // const name = this.signupForm.get('name').value;
    // const username = this.signupForm.get('username').value;
    // const email = this.signupForm.get('email').value;
    // const password = this.signupForm.get('password').value;
    
    this.authService.createNewUser(user).then(
      () => {
        this.router.navigate(['auth/signin']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}

// onSubmit() {
//   const name = this.signupForm.get('name').value;
//   const username = this.signupForm.get('username').value;
//   const email = this.signupForm.get('email').value;
//   const password = this.signupForm.get('password').value;
  
//   this.authService.createNewUser(name, username, email, password).subscribe({
//   // next: res => console.log(res),
//   // next: () => this.router.navigate(['/posts']),
//   // error: error => console.error (error)
//     next: 
//     (response: { message: string }) => {
//             // this.userId = response.userId;
//             // this.authToken = response.authToken;
//             this.isAuth$.next(true);
//             this.router.navigate(['/posts']);

//   },
//   error: error => console.error (error)
// // })
// })

//   // this.authService.createNewUser(name, username, email, password).then(
//   //   () => {
//   //     this.router.navigate(['/posts']);
//   //   },
//   //   (error) => {
//   //     this.errorMessage = error;
//   //   }
//   // );
// }
// }

// this.authService.createNewUser(name, username, email, password).subscribe({
//   next: res => console.log(res),
//   error: error => console.error (error)
// })
