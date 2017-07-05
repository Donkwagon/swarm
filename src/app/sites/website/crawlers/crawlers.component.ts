import { Component, OnInit, OnDestroy, Input }     from '@angular/core';
import { ActivatedRoute }                          from '@angular/router';

import { Site }                              from '../../../@core/classes/site';
import { SiteService }                       from '../../../@core/services/sites.service';
import { Crawler }                           from '../../../@core/classes/crawler';
import { CrawlerService }                    from '../../../@core/services/crawler.service';
import { SocketService }                     from '../../../@core/services/socket.service';

@Component({
  selector: 'app-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss'],
  providers: [SiteService,CrawlerService,SocketService]
})

export class CrawlersComponent implements OnInit {

  messages = [];
  connection;
  message;
  
  text: any;
  crawler: Crawler;

  urlStrategy: String[];
  urlTypes: String[];

  newUrlSectionPanel :Boolean;
  curUrlType: String;

  curNewUrlSection: any;
  newConst: any;
  newIdRange: any;
  newTicker: any;

  sub: any;
  siteName: string;
  site: Site;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private crawlerService: CrawlerService,
    private socketService: SocketService){

      this.urlTypes = ["CONSTANT","ID RANGE","TICKER"];

      this.newUrlSectionPanel = false;
      
      this.crawler = new Crawler();

      this.crawler.code = "///////////////////////////////////////////////////////////////////\r\n//Fields of interest\r\n///////////////////////////////////////////////////////////////////\r\n\r\nvar title           = null;\r\nvar author          = null;\r\nvar primaryStock    = null;\r\nvar username        = null;\r\nvar articleId       = null;\r\n\r\nvar include_stocks  = null;\r\nvar summary         = null;\r\nvar publish_at      = null;\r\n\r\n///////////////////////////////////////////////////////////////////\r\n//Add crawling code here\r\n///////////////////////////////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n";

      this.resetNewInputs();

    }

  ngOnInit() {

    this.sub = this.route.parent.params.subscribe(params => {
      this.siteName = params['siteName'];
      this.getSiteInfo();
    });

    this.connection = this.socketService.getMessages().subscribe(message => {
      this.messages.push(message);
    })

    this.message = "some messge";
    this.sendMessage();

  }
  
  ngOnDestroy() {

    this.sub.unsubscribe();

    this.connection.unsubscribe();

  }
  
  getSiteInfo = () => {

    this.siteService.getSitesBySite(this.siteName).then(res => {
      this.site = res[0];
    });
  }
  

  sendMessage(){

    this.socketService.sendMessage(this.message);
    this.message = '';

  }

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
