import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DeveloperService } from '../shared/developer.service';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';


// Avoid name not found warnings

@Injectable()
export class AuthService {

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  authenticated: boolean;

  constructor(private router: Router, private developerService: DeveloperService, public afAuth: AngularFireAuth) {
    // If authenticated, set local profile property and update login status subject
    this.authenticated ?
      this.setLoggedIn(true)
      : this.setLoggedIn(false);
  }


  login() {

    this.afAuth.auth.onAuthStateChanged(res =>{
        var deverloper = res;
        this.registerDeveloper(deverloper);
    });

    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());

  }

  registerDeveloper(developer) {
    
    this.developerService.getDeveloper(developer.uid).then(res => {
      console.log(res);
      if(!res){
        this.developerService.createDeveloper(developer).then(res => {
          console.log(res);
        });
      }
    });

  }


  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
  }

  private _setSession(authResult, profile) {
    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    this.setLoggedIn(true);
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  logout() {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    this.router.navigate(['/']);
    this.setLoggedIn(false);

    this.afAuth.auth.signOut();
  }

  get isAuthenticated() {
    return this.authenticated;
  }


}