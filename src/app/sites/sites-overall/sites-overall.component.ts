import { Component, OnInit } from '@angular/core';
import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';

@Component({
  selector: 'app-sites-overall',
  templateUrl: './sites-overall.component.html',
  styleUrls: ['./sites-overall.component.scss'],
  providers: [ SiteService ]
})

export class SitesOverallComponent implements OnInit {

  sites: Site[];

  constructor(private siteService: SiteService) {
  }

  ngOnInit() {
    this.getSiteList();
  }

  getSiteList = () => {
    this.siteService.getSites().then(res => {
      this.sites = res;
    });
  }

}
