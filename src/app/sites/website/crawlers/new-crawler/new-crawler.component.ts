import { Component,OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Crawler }                           from '../../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../../@core/services/crawler.service';
import { Site }                              from '../../../../@core/classes/site';
import { SiteService }                       from '../../../../@core/services/sites.service';

@Component({
  selector: 'app-new-crawler',
  templateUrl: './new-crawler.component.html',
  styleUrls: ['./new-crawler.component.scss'],
  providers: [CrawlerService,SiteService]
})

export class NewCrawlerComponent implements OnInit {

  newCrawler: Crawler;
  sub: any;
  siteName: string;
  site: Site;

  constructor(
      private route: ActivatedRoute,
      private crawlerService: CrawlerService,
      private siteService: SiteService){

        this.newCrawler = new Crawler();
  }

  ngOnInit() {

    this.sub = this.route.parent.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });
  }
  
  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
      console.log(res);
    });
  }
  
  setCrawlerType = (type) => {
    this.newCrawler.type = type;
  }

  setInputDataType(dataType) {
    this.newCrawler.inputDataType = dataType;
  }

  setOutputDataType(dataType) {
    this.newCrawler.outputDataType = dataType;
  }

  submitNewCrawler = () => {
    if(this.site){
      var crawler = this.newCrawler;
      crawler.site = this.site.name;
      crawler.siteId = this.site._id;

      this.crawlerService.createCrawler(this.newCrawler).then(res => {
        console.log(res);
      });

    }else{
      alert("site is not defined");
    }
  }

}
