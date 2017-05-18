export class Entrance {
    
    _id?: string;
    name: string;
    url: string;
    siteName: string;
    siteUrl: string;
    strategy: any;
    status:string;//backlog, inProgress, validating, completed

    constructor(
        name: string,
        url: string,
        siteName: string,
        siteUrl: string,
        strategy: any,
        status: string){
            name ? this.name = name:this.name = null,
            url ? this.url = url:this.url = null,
            siteName ? this.siteName = siteName:this.siteName = null,
            siteUrl ? this.siteUrl = siteUrl:this.siteUrl = null,
            strategy ? this.strategy = strategy:this.strategy = null,
            status ? this.status = status:this.status = null
    }
}