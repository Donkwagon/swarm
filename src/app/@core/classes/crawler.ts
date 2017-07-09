
import { Site } from './site';

export class Crawler {
    
    _id?: string;
    type: string; // webpage scraping, api
    name: string;
    site: string;
    siteId: string;
    code: string;
    doc: string;
    description: string;

    editHistory: any;

    urlStrategy: {root: String,sections: Object[]};

    crawlingStrategy: any;
    testingStrategy: any;

    validation: Boolean;

    created_at: Date;
    updated_at: Date;

    constructor(){
        this.urlStrategy = {root: "",sections: []};
        this.name = "";
        this.site = "";
        this.code = "///////////////////////////////////////////////////////////////////\r\n//Fields of interest\r\n///////////////////////////////////////////////////////////////////\r\n\r\nvar title           = null;\r\nvar author          = null;\r\nvar primaryStock    = null;\r\nvar username        = null;\r\nvar articleId       = null;\r\n\r\nvar include_stocks  = null;\r\nvar summary         = null;\r\nvar publish_at      = null;\r\n\r\n///////////////////////////////////////////////////////////////////\r\n//Add crawling code here\r\n///////////////////////////////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n";
        this.doc = "";
        this.description = "";
        this.testingStrategy = {type: "single",id : 1024};
        this.editHistory = [];
        this.validation = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}