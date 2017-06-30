
import { Component, OnInit, Input } from '@angular/core';
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
  @Input() site: Site;

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
      
      this.crawler = new Crawler();
      this.crawler.code = "\r\n///////////////////////////////////////////////////////////////////\r\n//Fields of interest\r\n///////////////////////////////////////////////////////////////////\r\nvar title = null;\r\nvar author = null;\r\nvar primaryStock = null;\r\nvar username = null;\r\nvar articleId = null;\r\n\r\nvar include_stocks = null;\r\nvar summary = null;\r\nvar publish_at = null;\r\n\r\nvar article = new Article({\r\n    articleId: articleId,\r\n    title: title,\r\n    author: author,\r\n    username: username,\r\n    summary: summary,\r\n    articleUrl: URL,\r\n    includeStocks: include_stocks,\r\n    primaryStock:primaryStock,\r\n\r\n    published_at: publish_at,\r\n    created_at: new Date()\r\n});\r\n\r\nreturn article;"

      this.resetNewInputs();

  }

  ngOnInit() {}
  
  ////////////////////////////////////////////////////////////////////////////
  //url panel logic
  ////////////////////////////////////////////////////////////////////////////

  toggleNewUrlSectionPanel = () => {
    this.resetNewInputs();
    this.newUrlSectionPanel ?
      this.newUrlSectionPanel = false :
      this.newUrlSectionPanel = true;
  }

  selectNewUrlSectionType = (type) => {
    this.resetNewInputs();
    this.curUrlType = type;
  }

  addNewUrlSection = () => {
    if(this.curUrlType === "CONSTANT"){
      this.crawler.urlStrategy.sections.push(this.newConst);
    }
    if(this.curUrlType == "ID RANGE"){
      this.crawler.urlStrategy.sections.push(this.newIdRange);

    }
    if(this.curUrlType === "TICKER"){
      this.crawler.urlStrategy.sections.push(this.newTicker);
    }

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
    console.log(typeof(this.crawler.code));
    console.log(this.crawler.code.length);
    console.log(this.crawler.code);
    console.log(JSON.stringify(this.crawler.code).length);
    console.log(JSON.stringify(this.crawler.code));
    //console.log(JSON.stringify(this.text));
    //this.runCode();
  }

  runCode = () => {
    console.log(typeof(this.crawler));
    this.crawlerService.runCode(this.crawler).then(res => {
      console.log(res);
    });
  }
}
