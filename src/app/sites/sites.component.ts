
import { Component, OnInit } from '@angular/core';

import { Site } from '../@core/classes/site';
import { SiteService } from '../@core/services/sites.service';


@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss'],
  providers: [ SiteService ]
})

export class SitesComponent implements OnInit {

  sites: Site[];

  constructor(private siteService: SiteService) {
  }

  ngOnInit() {
  }


}
