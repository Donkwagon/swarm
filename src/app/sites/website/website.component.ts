import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
  providers: [SiteService]
})

export class WebsiteComponent implements OnInit {

  sub: any;
  siteName: string;
  site: Site;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService) {}

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });

  }

  getSiteInfo = () => {
    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });
  }
}
