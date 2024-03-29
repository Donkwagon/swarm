import { Component }                                    from '@angular/core';
import { Router, NavigationStart,RoutesRecognized }                       from '@angular/router';

import { AngularFireDatabase, FirebaseListObservable }  from 'angularfire2/database';
import { Observable }                                   from 'rxjs/Observable';
import { AngularFireAuth }                              from 'angularfire2/auth';
import * as firebase                                    from 'firebase/app';

import { Developer }                                    from './@core/classes/developer';
import { DeveloperService }                             from './@core/shared/developer.service';

import { RouterMapper }                                    from './@core/classes/router-mapper';
import { CookieService } from 'ngx-cookie';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [CookieService]
})

export class AppComponent {

  developer: any;
  appReady: boolean;

  routerMapper: RouterMapper;
  curentRouteMapper: any[];

  constructor(
    db: AngularFireDatabase,
    private router: Router,
    public afAuth: AngularFireAuth,
    private developerService: DeveloperService,
    private cookieService: CookieService) {

    this.appReady = false;
    
    this.developer = new Developer();

    var userInfo = null;

    if(cookieService.get("swarm-developer")){
      var developer = cookieService.get("swarm-developer");
      this.developerService.setDeveloper(JSON.parse(developer));
      this.appReady = true;
    }


    afAuth.auth.onAuthStateChanged(res =>{

      this.developer = res;
      
      if(res){
        this.registerDeveloper(this.developer);
      }
      
    });

    this.routerMapper = new RouterMapper("SWARM",router.config);

    this.router.events.subscribe(event => {

      if(event instanceof NavigationStart) {
        this.routerMapper.mapUrl(event.url);
      }

    });

  }

  registerDeveloper = (developer) => {
    
    this.developerService.getDeveloper(developer.uid).then(res => {
      if(res){
        this.developerService.setDeveloper(res);
        var cookie = JSON.stringify(res);
        this.cookieService.put("swarm-developer",cookie);
      }else{
        this.developerService.createDeveloper(developer).then(res => {
          this.developerService.setDeveloper(res);
          var cookie = JSON.stringify(res);
          this.cookieService.put("swarm-developer",cookie);
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