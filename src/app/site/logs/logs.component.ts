import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  logs: FirebaseListObservable<any>;

  constructor(db: AngularFireDatabase) {
    console.log(db);
    this.logs = db.list('/swarm/logs');
    console.log(this.logs);
  }

  ngOnInit() {
  }

}
