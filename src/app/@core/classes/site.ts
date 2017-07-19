export class Site {
    
    _id?: string;

    name: string;
    type: String; //id based, periodically updated
    description: string;
    imgUrl: string;

    crawlers: any;
    url: string;

    sitemapUrl: string;
    sitemap: any;

    robotTxtUrl: string;
    robotTxt: any;

    created_by: string;
    created_at: Date;
    updated_at: Date;

    constructor(){
        this.name = "";
        this.type = "News Portal";
        this.description = "";
        this.imgUrl = "";
        this.url = "";
        this.created_by = "false";
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}