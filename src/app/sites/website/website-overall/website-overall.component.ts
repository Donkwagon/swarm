import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Site }                              from '../../../@core/classes/site';
import { SiteService }                       from '../../../@core/services/sites.service';

@Component({
  selector: 'app-website-overall',
  templateUrl: './website-overall.component.html',
  styleUrls: ['./website-overall.component.scss'],
  providers: [SiteService]
})
export class WebsiteOverallComponent implements OnInit {
  
  sub: any;
  siteName: string;
  site: Site;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService){
  }

  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });

  }

  ngOnDestroy() {

    this.sub.unsubscribe();

  }

  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });
  }

}
