import { Component } from '@angular/core';
import firebase from 'firebase'; //firebase

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // firebase
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyDBBnu_ovfuT2rZuman1peojKMx6VGNUmo",
      authDomain: "groupomania-caa6e.firebaseapp.com",
      projectId: "groupomania-caa6e",
      storageBucket: "groupomania-caa6e.appspot.com",
      messagingSenderId: "854964775947",
      appId: "1:854964775947:web:da9bd7f7771feb275c2b0e"
    };
    firebase.initializeApp(firebaseConfig);
  }
  //
}
