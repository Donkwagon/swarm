import { Component, OnInit } from '@angular/core';

import { EntranceService } from '../../@core/services/entrance.service';
import { Entrance } from '../../@core/classes/entrance';

@Component({
  selector: 'app-entrances',
  templateUrl: './entrances.component.html',
  styleUrls: ['./entrances.component.scss'],
  providers: [EntranceService]
})

export class EntrancesComponent implements OnInit {

  entranceList: Entrance[];
  constructor(private entranceService:EntranceService) {
    this.entranceList = [];
  }

  ngOnInit() {
    this.getEntranceBySiteName();
  }

  public getEntranceBySiteName() {
    this.entranceService.getEntrances().then((entranceList : Entrance[]) => {
      entranceList.forEach(entrance =>{
        this.entranceList.push(entrance);
      });
    });
  }

  public deleteEntrance(entrance) {
    var entranceId = entrance._id;

    this.entranceService.deleteEntrance(entranceId).then((res : String) => {
      console.log(res);
    });
  }
}
