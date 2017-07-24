export class Conversation {
    
    _id?: string;

    users: any[];
    messages: any[];
    
    numMessages: Number;

    links: any[];
    images: any[];

    created_at: Date;
    updated_at: Date;

    constructor(){
    }
}