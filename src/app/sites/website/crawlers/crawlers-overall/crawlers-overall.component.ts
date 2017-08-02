import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Site }                              from '../../../../@core/classes/site';
import { SiteService }                       from '../../../../@core/services/sites.service';
import { Crawler }                           from '../../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../../@core/services/crawler.service';

@Component({
  selector: 'app-crawlers-overall',
  templateUrl: './crawlers-overall.component.html',
  styleUrls: ['./crawlers-overall.component.scss'],
  providers: [SiteService,CrawlerService]
})

export class CrawlersOverallComponent implements OnInit {

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
    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      console.log(params);
      this.getCrawlers();
    });

  }

  ngOnDestroy() {

    this.sub.unsubscribe();

  }
  
  getCrawlers = () => {

    this.crawlerService.getCrawlersBySite(this.siteName).then(res => {

      console.log(res);
      if(res){this.crawlers = res;}
  
    });
  }

}
