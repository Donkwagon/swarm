import { Component, OnInit } from '@angular/core';

import { EntranceService } from '../../@core/services/entrance.service';
import { Entrance } from '../../@core/classes/entrance';

@Component({
  selector: 'app-entrances',
  templateUrl: './entrances.component.html',
  styleUrls: ['./entrances.component.scss']
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
      console.log(JSON.stringify(entranceList));
      entranceList.forEach(entrance =>{
        this.entranceList.push(entrance);
      });
    });
  }

}
