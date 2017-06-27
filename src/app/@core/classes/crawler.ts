
import { Site } from './site';

export class Crawler {
    
    _id?: string;
    name: string;
    site: Site;
    siteId: string;
    code: string;
    doc: string;
    editHistor: any;

    created_at: Date;
    updated_at: Date;
    constructor(){}
}