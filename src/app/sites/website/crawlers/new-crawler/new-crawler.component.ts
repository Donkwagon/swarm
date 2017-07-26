import { Component,OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Crawler }                           from '../../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../../@core/services/crawler.service';
import { Site }                              from '../../../../@core/classes/site';
import { SiteService }                       from '../../../../@core/services/sites.service';

import { Developer } from '../../../../@core/classes/developer';
import { DeveloperService } from '../../../../@core/shared/developer.service';

@Component({
  selector: 'app-new-crawler',
  templateUrl: './new-crawler.component.html',
  styleUrls: ['./new-crawler.component.scss'],
  providers: [CrawlerService,SiteService]
})

export class NewCrawlerComponent implements OnInit {

  developer: Developer;

  newCrawler: Crawler;
  sub: any;
  siteName: string;
  site: Site;

  constructor(
      private route: ActivatedRoute,
      private crawlerService: CrawlerService,
      private siteService: SiteService,
      private developerService: DeveloperService){
        
        this.developer = new Developer();
        this.developer = developerService.accessDeveloper();

        this.newCrawler = new Crawler(this.developer);
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
