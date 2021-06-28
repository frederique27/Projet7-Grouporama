import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';
import { User } from '../models/Users.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  // profile: User[];
  user: User;
  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {
    this.user = this.authService.userValue;
  }

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile(){
    this.profileService.getProfile().subscribe({
      // next: profile => this.profile = profile,
      error: error => console.error (error)
    })
  }

}
