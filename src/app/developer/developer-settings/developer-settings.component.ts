import { Component, OnInit } from '@angular/core';
import { Developer } from '../../@core/classes/developer';
import { DeveloperService } from '../../@core/shared/developer.service';

@Component({
  selector: 'app-developer-settings',
  templateUrl: './developer-settings.component.html',
  styleUrls: ['./developer-settings.component.scss']
})
export class DeveloperSettingsComponent implements OnInit {

  developer: Developer;

  constructor(private developerService: DeveloperService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
  }

  ngOnInit() {
  }

}
