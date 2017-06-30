import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';
import { Crawler } from '../../@core/classes/crawler';
import { CrawlerService } from '../../@core/services/crawler.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
  providers: [SiteService,CrawlerService]
})
export class WebsiteComponent implements OnInit {

  sub: any;
  siteName: string;
  site: Site;

  mode: string;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private crawlerService: CrawlerService) {

      this.mode = null;
  }

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

  openMode = (mode) => {
    this.mode = mode
  }

}
