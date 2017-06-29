
import { Site } from './site';

export class Crawler {
    
    _id?: string;
    name: string;
    site: Site;
    siteId: string;
    code: string;
    doc: string;

    editHistory: any;

    urlStrategy: {
        root: String,
        sections: Object[]
    };

    validation: Boolean;

    created_at: Date;
    updated_at: Date;

    constructor(){}
    
}