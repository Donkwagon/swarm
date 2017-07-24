export class Message {
    
    _id?: string;
    user: String;
    username: String;
    displayName: String;
    imgUrl: string;
    content: String;

    links: any[];
    images: any[];

    created_at: Date;
    read_at: Date;

    constructor(){
    }
}