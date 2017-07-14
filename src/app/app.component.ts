import { Component }                                    from '@angular/core';
import { Router, NavigationStart,RoutesRecognized }                       from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable }  from 'angularfire2/database';
import { Observable }                                   from 'rxjs/Observable';
import { AngularFireAuth }                              from 'angularfire2/auth';
import * as firebase                                    from 'firebase/app';

import { Developer }                                    from './@core/classes/developer';
import { DeveloperService }                             from './@core/shared/developer.service';

import { RouterMapper }                                    from './@core/classes/router-mapper';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  developer: Developer;
  menuDisplay: boolean;
  appReady: boolean;

  routerMapper: RouterMapper;

  constructor(
    db: AngularFireDatabase,
    private router: Router,
    public afAuth: AngularFireAuth,
    private developerService: DeveloperService) {
    
    var audio = new Audio();
    audio.src = "http://www.bigsoundbank.com/sounds/mp3/0945.mp3";
    audio.load();
    audio.play();
    
    this.developer = new Developer();

    this.menuDisplay = false;

    afAuth.auth.onAuthStateChanged(res =>{
      this.developer = res;
      this.registerDeveloper(this.developer);
    });

    this.routerMapper = new RouterMapper("SWARM",router.config);
    console.log(this.routerMapper);

    this.router.events.subscribe(event => {
      if(event instanceof RoutesRecognized ){
        
      }
      if(event instanceof NavigationStart) {
        this.menuDisplay = false;
      }
    });
  }

  registerDeveloper = (developer) => {
    
    this.developerService.getDeveloper(developer.uid).then(res => {

      if(res){
        console.log(res);
        this.developerService.setDeveloper(res);
        this.appReady = true;
      }else{
        this.developerService.createDeveloper(developer).then(res => {
          this.developerService.setDeveloper(res);
        });
      }
      
    });
  }

  menuExpand = () => {
    this.menuDisplay = true;
  }

  menuCollapse = () => {
    this.menuDisplay = false;
  }


  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
    this.developer = null;
  }
}
