import { Component, OnInit } from '@angular/core';
import { Developer } from '../../../@core/classes/developer';
import { DeveloperService } from '../../../@core/shared/developer.service';

@Component({
  selector: 'app-developer-settings-basic',
  templateUrl: './developer-settings-basic.component.html',
  styleUrls: ['./developer-settings-basic.component.scss']
})
export class DeveloperSettingsBasicComponent implements OnInit {

  developer: Developer;

  constructor(private developerService: DeveloperService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
  }

  ngOnInit() {
  }
  discardChanges() {
    return;
  }

  saveChanges() {
    this.developerService.updateDeveloper(this.developer).then(res =>{
      console.log(res);
    });
  }

}
