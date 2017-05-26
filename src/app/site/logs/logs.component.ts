import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { WebSocketService } from '../../@core/services/websocket.service';
import { LogService } from '../../@core/services/log.service';
import { Log } from '../../@core/classes/log';

import {Subject} from 'rxjs/Subject';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import 'rxjs/add/operator/reduce'; // you might need to import this, or not depends on your setup



@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
  providers: [LogService]
})
export class LogsComponent implements OnInit {

  logs: FirebaseListObservable<any>;
  reducedLogs: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase, private weService:WebSocketService) {
    weService.connect("http://localhost:8080/");
  }

  ngOnInit() {
    this.logs.subscribe(value => console.log("subscribed"));
  }

  getFirebaseLogs = () =>{
  
    this.logs = <FirebaseListObservable<any>> this.db.list('/swarm/logs', {
      query: {
        limit: 50
      }
    }).map(items => { //first map
      return items.map(item => {
        return item;
      })
    });

  }

  getMongoDbLogs = () =>{

  }

  removeDocument = () =>{
    this.logs.remove();
  }
}
