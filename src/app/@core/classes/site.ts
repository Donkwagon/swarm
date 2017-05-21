export class Site {
    
    _id?: string;
    name: string;
    description: string;
    url: string;
    status:string;//backlog, inProgress, validating, completed

    constructor(
        name: string,
        description: string,
        url: string,
        status: string){
            name ? this.name = name:this.name = null,
            description ? this.description = description:this.description = null,
            url ? this.url = url:this.url = null,
            status ? this.status = status:this.status = null
    }
}