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
  time: any;
  serverNum: Number;
  queueLength: Number;

  constructor(private db: AngularFireDatabase) {
    this.servers = db.list('/redis/servers');
    setInterval(() => {
        this.time =  new Date();
     }, 1000);
  }

  ngOnInit() {
    //this.getServers();
    this.db.list('/redis/queues', { preserveSnapshot: true }).subscribe(snapshots => {
      console.log(snapshots);
      this.queueLength = snapshots.length;
    })
  }

  getServers() {
    console.log("getting servers");
  
    this.servers = <FirebaseListObservable<any>> this.db.list('/redis/servers', {}).map(items => { //first map
      return items.map(item => {
        console.log(item);
        return item;
      })
    });
  }

}
