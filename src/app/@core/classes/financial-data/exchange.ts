export class Exchange {
    
    _id?: string;

    exchange: string;
    exchangeName: string;
    
    numSecurities: Number;

    sectorMappingPercent: Number;   //percent of total securities mapped with sector info
    industryMappingPercent: Number; //percent of total securities mapped with industry info
    
    created_at: Date;
    updated_at: Date;

    constructor(){
    }
}