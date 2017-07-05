
import { Site } from './site';

export class Crawler {
    
    _id?: string;
    type: string; // webpage scraping, api
    name: string;
    site: string;
    siteId: string;
    code: string;
    doc: string;

    editHistory: any;

    urlStrategy: {
        root: String,
        sections: Object[]
    };

    crawlingStrategy: any;
    testingStrategy: any;

    validation: Boolean;

    created_at: Date;
    updated_at: Date;

    constructor(){
        this.urlStrategy = {
            root: "",
            sections: []
        };
    }
}