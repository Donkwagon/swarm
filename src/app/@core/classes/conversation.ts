export class Conversation {
    
    _id?: string;

    users: any[];
    messages: any[];
    type: any;//user, system, AI.. :O
    
    numMessages: Number;

    links: any[];
    images: any[];

    created_at: Date;
    updated_at: Date;

    constructor(){
    }
}