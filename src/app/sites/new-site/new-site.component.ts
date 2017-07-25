import { Component, OnInit } from '@angular/core';
import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';

import { Developer } from '../../@core/classes/developer';
import { DeveloperService } from '../../@core/shared/developer.service';

@Component({
  selector: 'app-new-site',
  templateUrl: './new-site.component.html',
  styleUrls: ['./new-site.component.scss'],
  providers: [SiteService]
})
export class NewSiteComponent implements OnInit {

  developer: Developer;
  newSite: Site;

  constructor(private siteService: SiteService, private developerService: DeveloperService) { 
    this.developer = new Developer();
    this.developer = developerService.accessDeveloper();
    this.newSite = new Site(this.developer);
  }

  ngOnInit() {
  }

  submitNewSite = () => {
    this.siteService.createSite(this.newSite).then(res => {
      console.log(res);
    });
  }

}
