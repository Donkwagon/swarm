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
  heroImages: String[];

  constructor(private db: AngularFireDatabase) {
    this.servers = db.list('/redis/servers');
    this.heroImages = [
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/3/3d/Genji_link.png?version=e4d8892ec45b6e6057846115cff3fc8d",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/c/c2/McCree_link.png?version=d7e1bf7a969bb245f441b0b9763c47fb",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/8/86/Pharah_link.png?version=53bcfa174ffdbeb7e1620f761b586413",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/6/63/Reaper_link.png?version=65757e6a21d9e8d9fa3bfc26a8ce6d7d",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/b/b2/Soldier_76_link.png?version=b924097d679c6037702f0d7c480c54fe",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/5/51/Sombra_link.png?version=43b762bfe9f52a81fbed478fdffb21a0",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/a/a4/Tracer_link.png?version=f85b22a4dc67171deeed4ea61eb46e4c",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/d/dc/Bastion_link.png?version=79c37a192efc0fe25026674d1ac67635",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/9/9a/Hanzo_link.png?version=22d9e9e0845326ef4408c0b45fec8360",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/d/d0/Junkrat_link.png?version=ad20d7147de2f54dc1a7b787819a54a4",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/7/7d/Mei_link.png?version=844de2c6ad890b676be6c7efbdb77a0c",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/5/55/Torbj%C3%B6rn_link.png?version=ff80a6fd39411f459eca50f6ee635a94",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/f/f1/Widowmaker_link.png?version=4609a6aa3f6e784b019cf5e8fb184954",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/a/ab/D.Va_link.png?version=a4c5cf16b44f72718f8360f0f3d13543",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/e/e8/Orisa_link.png?version=b274d7c0f3cb4c31301c5032590637a7",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/3/33/Reinhardt_link.png?version=79918e413d4e4f023a65b386c556e1e1",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/0/03/Roadhog_link.png?version=21d6f4cd01ad5b83dc85527dff7eb9e6",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/2/24/Winston_link.png?version=26f11283e0a3ed199aaf8e302240fb2e",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/0/05/Zarya_link.png?version=dd47fd879689f8d55a4695aa9e97e785",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/8/80/Ana_link.png?version=f750027f0df0baaaa8875830eca342f0",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/d/de/L%C3%BAcio_link.png?version=3bfa049706e4bd3bfccbc06108bd7d9c",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/d/de/L%C3%BAcio_link.png?version=3bfa049706e4bd3bfccbc06108bd7d9c",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/0/03/Mercy_link.png?version=91a7e37e42739c0b33629530cb17563c",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/3/31/Symmetra_link.png?version=5e293ac2888505ebedd6b93386ed5094",
      "https://hydra-media.cursecdn.com/overwatch.gamepedia.com/6/60/Zenyatta_link.png?version=276a6987721ab8c5cad50f397fc29ec6"

    ]
  }

  ngOnInit() {
    //this.getServers();
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
