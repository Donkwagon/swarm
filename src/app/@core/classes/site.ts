export class Site {
    
    _id?: string;
    name: string;
    type: String; //id based, periodically updated
    numStep: Number;
    description: string;
    crawlers: any;
    imgUrl: string;
    url: string;
    created_at: Date;
    updated_at: Date;

    constructor(){
    }
}