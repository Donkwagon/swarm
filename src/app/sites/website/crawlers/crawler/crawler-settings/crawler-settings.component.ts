import { Component, OnInit } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Crawler }                           from '../../../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../../../@core/services/crawler.service';
import { Site }                              from '../../../../../@core/classes/site';
import { SiteService }                       from '../../../../../@core/services/sites.service';


@Component({
  selector: 'app-crawler-settings',
  templateUrl: './crawler-settings.component.html',
  styleUrls: ['./crawler-settings.component.scss'],
  providers: [CrawlerService,SiteService]
})
export class CrawlerSettingsComponent implements OnInit {

  sub: any;
  crawlerId: string;
  crawler: Crawler;

  sub_crawler:any;
  siteName: string;
  site: Site;

  constructor(
      private route: ActivatedRoute,
      private crawlerService: CrawlerService,
      private siteService: SiteService){
}

  ngOnInit() {

    this.sub = this.route.parent.parent.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });

    this.sub_crawler = this.route.parent.params.subscribe(params => {
      this.crawlerId = params['crawlerId'];
      this.getCrawler();
    });


  }

  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });

  }
  
  getCrawler = () => {

    this.crawlerService.getCrawler(this.crawlerId).then(res => {

      this.crawler = res;

    });

  }

  ngOnDestroy() {

    this.sub.unsubscribe();
    this.sub_crawler.unsubscribe();

  }

  setInputDataType(dataType) {
    this.crawler.inputDataType = dataType;
  }

  setOutputDataType(dataType) {
    this.crawler.outputDataType = dataType;
  }


  discardChanges() {
    return;
  }

  saveChanges() {

    this.crawlerService.updateCrawler(this.crawler).then(res => {
      console.log(res);
    });
  }

  deleteCrawler() {

    this.crawlerService.deleteCrawler(this.crawler._id).then(res => {
      console.log(res);
    });
  }
}
