import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Developer } from './@core/classes/developer';
import { DeveloperService } from './@core/services/developer.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ DeveloperService ]
})

export class AppComponent {

  developer: Developer;

  constructor(
    db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private developerService: DeveloperService) {
    
    var audio = new Audio();
    audio.src = "http://www.bigsoundbank.com/sounds/mp3/0945.mp3";
    audio.load();
    audio.play();

    this.developer = new Developer();

    afAuth.auth.onAuthStateChanged(res =>{
      this.developer = res;
      this.registerDeveloper(this.developer);
    });
  }

  registerDeveloper = (developer) => {
    
    this.developerService.getDeveloper(developer.uid).then(res => {
      console.log(res);
      if(!res){
        this.developerService.createDeveloper(developer).then(res => {
          console.log(res);
        });
      }
    });
  }


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.developer = null;
  }
}
