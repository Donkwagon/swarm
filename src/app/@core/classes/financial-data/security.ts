export class Security {
    
    _id?: string;

    symbol: String;
    securityName: String;

    industry: String;
    sector: String;
    
    exhange: String;
    
    created_at: Date;
    updated_at: Date;

    earnings: any;
    company: any;
    quote: any;
    news: any;
    financials: any;
    logo: any;

    IEXListed: Boolean;

    "chart": any;
    "chart/3m": any;
    "chart/ytd": any;
    "chart/1m": any;
    "chart/1y": any;
    "chart/5y": any;
    "chart/1d": any;
    "chart/6m": any;
    "chart/2y": any;

    constructor(){
    }
}