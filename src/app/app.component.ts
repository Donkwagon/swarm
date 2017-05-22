import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(db: AngularFireDatabase) {
    var audio = new Audio();
    audio.src = "http://www.bigsoundbank.com/sounds/mp3/0945.mp3";
    audio.load();
    audio.play();
  }
}
