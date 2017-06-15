import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import {Subject} from 'rxjs/Subject';
import { Observable }         from 'rxjs/Observable';
import 'rxjs/add/operator/map'; // you might need to import this, or not depends on your setup
import 'rxjs/add/operator/reduce'; // you might need to import this, or not depends on your setup

@Component({
  selector: 'app-cluster',
  templateUrl: './cluster.component.html',
  styleUrls: ['./cluster.component.scss']
})
export class ClusterComponent implements OnInit {

  servers: FirebaseListObservable<any>;

  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
  }

  getServers() {

  
    this.servers = <FirebaseListObservable<any>> this.db.list('/swarm/logs', {
      query: {
        limit: 50
      }
    }).map(items => { //first map
      return items.map(item => {
        return item;
      })
    });
  }

}
