import { Component, OnInit } from '@angular/core';
import { Developer } from '../../@core/classes/developer';
import { DeveloperService } from '../../@core/shared/developer.service';

@Component({
  selector: 'app-developer-activities',
  templateUrl: './developer-activities.component.html',
  styleUrls: ['./developer-activities.component.scss']
})
export class DeveloperActivitiesComponent implements OnInit {

  developer: Developer;

  constructor(private developerService: DeveloperService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
  }

  ngOnInit() {
  }

}
