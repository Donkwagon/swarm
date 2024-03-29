import { Component, OnInit } from '@angular/core';

import { Developer } from '../@core/classes/developer';
import { DeveloperService } from '../@core/shared/developer.service';

@Component({
  selector: 'app-developer',
  templateUrl: './developer.component.html',
  styleUrls: ['./developer.component.scss']
})

export class DeveloperComponent implements OnInit {

  developer: Developer;

  constructor(private developerService: DeveloperService) {
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
  }

  ngOnInit() {
  }

}
