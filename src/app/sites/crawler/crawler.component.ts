
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Site } from '../../@core/classes/site';
import { SiteService } from '../../@core/services/sites.service';
import { Crawler } from '../../@core/classes/crawler';
import { CrawlerService } from '../../@core/services/crawler.service';

@Component({
  selector: 'app-crawler',
  templateUrl: './crawler.component.html',
  styleUrls: ['./crawler.component.scss'],
  providers: [SiteService,CrawlerService]
})

export class CrawlerComponent implements OnInit {

  text: any;
  crawler: Crawler;
  siteName: string;
  sub: any;
  site: Site;
  urlStrategy: String[];
  urlTypes: String[];

  newUrlSectionPanel :Boolean;
  curUrlType: String;

  curNewUrlSection: any;
  newConst: any;
  newIdRange: any;
  newTicker: any;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private crawlerService: CrawlerService){

      this.urlTypes = ["CONSTANT","ID RANGE","TICKER"];

      this.newUrlSectionPanel = false;

      this.resetNewInputs();

  }

  ngOnInit() {

    this.crawler = new Crawler();

    this.sub = this.route.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });

  }

  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      
      this.site = res[0];

      if(!this.crawler.urlStrategy){
        
        this.crawler.urlStrategy = {
          root: this.site.url,
          sections: []
        };
      }
    });
  }

  ////////////////////////////////////////////////////////////////////////////
  //url panel logic
  ////////////////////////////////////////////////////////////////////////////

  selectNewUrlSectionType = (type) => {
    this.resetNewInputs();
    this.curUrlType = type;
  }

  toggleNewUrlSectionPanel = () => {
    this.resetNewInputs();
    this.newUrlSectionPanel ?
      this.newUrlSectionPanel = false :
      this.newUrlSectionPanel = true;
  }

  addNewUrlSection = () => {
    console.log("function binded");

    if(this.curUrlType === "CONSTANT"){
      this.crawler.urlStrategy.sections.push(this.newConst);
    }
    if(this.curUrlType == "ID RANGE"){
      this.crawler.urlStrategy.sections.push(this.newIdRange);

    }
    if(this.curUrlType === "TICKER"){
      this.crawler.urlStrategy.sections.push(this.newTicker);
    }
    console.log(this.crawler);

    this.resetNewInputs();
  }

  removeUrlSection = (urlSection) => {
    var index = this.crawler.urlStrategy.sections.indexOf(urlSection);
    this.crawler.urlStrategy.sections.splice(index,1);
  }

  resetNewInputs = () => {
    this.curUrlType = null;

    this.newConst = {
      type:"CONSTANT",
      url: "",
      prefix: "",
      suffix: ""
    };

    this.newIdRange = {
      type:"ID RANGE",
      min: 0,
      max: 0,
      prefix: "",
      suffix: ""
    };

    this.newTicker = {
      type:"TICKER",
      prefix: "",
      suffix: ""
    }

  }

  ////////////////////////////////////////////////////////////////////////////
  //editor logic
  ////////////////////////////////////////////////////////////////////////////
  
  onChange = () => {
    console.log(this.text);
    console.log(JSON.stringify(this.text));
    //this.runCode();
  }

  runCode = () => {
    console.log(typeof(this.crawler));
    this.crawlerService.runCode(this.crawler).then(res => {
      console.log(res);
    });
  }
}
