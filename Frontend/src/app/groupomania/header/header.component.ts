import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs'; //
import { Router } from '@angular/router';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	faBell = faBell;
	faPlus = faPlus;
	faUserCircle = faUserCircle;
	faSignOutAlt = faSignOutAlt;
	faCircle = faCircle;

	isAuth: boolean;
	authSubscription: Subscription; //
	show = false;
	notif = true;


	constructor(private authService: AuthService,
		private router: Router) { }

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
