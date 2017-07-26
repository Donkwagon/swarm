import { DeveloperInterface } from "../interfaces/developer.interface";

export class Task {
    
    _id?: string;

    title: string;
    description: String;
    
    complete: boolean;

    developer: DeveloperInterface;

    created_at: Date;
    updated_at: Date;

    constructor(developer){
        
        this.title = "";
        this.description = "";
        this.complete = false;

        this.developer.name = developer.displayName;
        this.developer.uid = developer.uid;

        this.created_at = new Date();
        this.updated_at = new Date();
    }
}