import { Component, OnInit, OnDestroy, Input }     from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Site }                              from '../../../@core/classes/site';
import { SiteService }                       from '../../../@core/services/sites.service';
import { Crawler }                           from '../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../@core/services/crawler.service';

@Component({
  selector: 'app-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss'],
  providers: [SiteService,CrawlerService]
})

export class CrawlersComponent implements OnInit {


  sub: any;
  siteName: string;
  site: Site;

  crawlers: Crawler[];

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private crawlerService: CrawlerService){
    }

  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      console.log(params);
      this.getSiteInfo();
      this.getCrawlers();
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
  
  
  getCrawlers = () => {

    this.crawlerService.getCrawlersBySite(this.siteName).then(res => {

      console.log(res);
      this.crawlers = res;
      
    });

  }
  
}
