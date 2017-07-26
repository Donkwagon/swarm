
import { Site } from './site';
import { DeveloperInterface } from "../interfaces/developer.interface";

export class Crawler {
    
    _id?: string;
    name: string;
    type: string; // webpage scraping, api

    inputDataType: string;
    outputDataType: string;

    backlogBatchSize: number;
    backlogGenerated: boolean;
    batches: any; //array of batch status

    site: string;
    siteId: string;
    siteImgUrl: string;

    code: string;
    doc: string;
    description: string;

    exampleUrl: string;

    editHistory: any;

    urlStrategy: {root: String,sections: Object[]};

    crawlingStrategy: any;
    testingStrategy: any;
    
    created_by: string;

    validation: Boolean;

    developer: DeveloperInterface;

    created_at: Date;
    updated_at: Date;

    constructor(developer){
        
        this.backlogGenerated = false;
        this.backlogBatchSize = 1000;
        this.urlStrategy = {root: "",sections: []};
        this.name = "";
        this.site = "";
        this.code = "///////////////////////////////////////////////////////////////////\r\n//Fields of interest\r\n///////////////////////////////////////////////////////////////////\r\n\r\nvar title           = null;\r\nvar author          = null;\r\nvar primaryStock    = null;\r\nvar username        = null;\r\nvar articleId       = null;\r\n\r\nvar include_stocks  = null;\r\nvar summary         = null;\r\nvar publish_at      = null;\r\n\r\n///////////////////////////////////////////////////////////////////\r\n//Add crawling code here\r\n///////////////////////////////////////////////////////////////////\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n";
        this.doc = "";
        this.exampleUrl = "";
        this.description = "";
        this.testingStrategy = {type: "single",id : 1024};
        this.editHistory = [];
        this.validation = false;

        this.developer.name = developer.displayName;
        this.developer.uid = developer.uid;

        this.created_at = new Date();
        this.updated_at = new Date();
    }
}