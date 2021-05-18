import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs'; //
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  authSubscription: Subscription; //

  constructor(private authService: AuthService,
              private router: Router ) { }

  ngOnInit() {
    this.authSubscription = this.authService.isAuth$.subscribe(
      (authService) => {
        this.isAuth = authService;
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

  newPost() {
    this.router.navigate(['/posts', 'new']);
  }

}
