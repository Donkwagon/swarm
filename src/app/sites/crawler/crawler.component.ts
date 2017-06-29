
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
          root:{
            type:"root",
            urlSection:this.site.url
          },
          sections:[]
        };
      }
    });
  }

  selectNewUrlSectionType = (type) => {
    this.curUrlType = type;
  }

  clearNewUrlSectionType = () => {
    this.curUrlType = null;
  }

  toggleNewUrlSectionPanel = () => {
    console.log(this.newUrlSectionPanel);
    this.newUrlSectionPanel ?
      this.newUrlSectionPanel = false :
      this.newUrlSectionPanel = true;
  }

  addNewUrlSection = () => {

    if(this.newConst.editing){

    }
    if(this.newIdRange.editing){

    }
    if(this.newTicker.editing){

    }
  }

  resetNewInputs = () => {

      this.newConst = {
        url: "",
        prefix: "",
        suffix: "",
        editing: false
      };

      this.newIdRange = {
        min: 0,
        max: 0,
        prefix: "",
        suffix: "",
        editing: false
      };

      this.newTicker = {
        prefix: "",
        suffix: "",
        editing: false
      }

  }

  addUrlStrategy = () => {
    this.crawler.urlStrategy.sections.push();
  }

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
