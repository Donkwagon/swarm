import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import 'rxjs/add/operator/reduce'; // you might need to import this, or not depends on your setup



@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: FirebaseListObservable<any>;
  reducedLogs: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
  
    this.logs = <FirebaseListObservable<any>> db.list('/swarm/logs', {
      query: {
        limitToFirst: 10,
        limitToLast: 100,
      }
    }).map(items => { //first map
      return items.map(item => {
        return item;
      })
    });

    // this.logs = <FirebaseListObservable<any>> db.list('/swarm/logs').reduce(items => { //first map
    //   return items.reduce((x,y) => {
    //     console.log(x+1);
    //   })
    // });
  }

  ngOnInit() {
    this.logs.subscribe(value => console.log("subscribed"));
  }

}
