export class Task {
    
    _id?: string;

    title: string;
    description: String;
    
    complete: boolean;
    created_by: string;

    created_at: Date;
    updated_at: Date;

    constructor(){
        this.title = "";
        this.description = "";
        this.complete = false;
        this.created_by = "";
        this.created_at = new Date();
        this.updated_at = new Date();
    }
}