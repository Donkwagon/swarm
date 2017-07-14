export class RouterMapper {
    name: string;
    children: any;
    count: number;
    map: any[];

    constructor(name,routerConfig){

        this.name = name;
        this.children = [];
        this.count = 0;
        this.map = [];

        routerConfig.forEach(node => {
            this.getChildren(node,this);
        })
        
    }

    getChildren(routerNode,mapperNode) {
        //recursively get all child nodes of all nodes

        if(routerNode.path){

            var node = {
                name: routerNode.path,
                children: []
            };

            this.count++;
            mapperNode.children.push(node);
            
            if(routerNode.children){
                routerNode.children.forEach(child => {
                    this.getChildren(child,node);
                });
            }

        }
    }

    mapUrl(url) {

        //the method is triggered on every state change
        //reset the map property on each trigger

        this.map = [];

        url = url.split("/");

        var len = url.length;
        var i = 0;
        
        var pathDictionary = this.children;

        while(i < len){
            var mapped = false;
            pathDictionary.forEach(node => {

                if(url[i] === node.name){
                    
                    var mapperNode = {
                        name: node.name,
                        children: node.children
                    }

                    this.map.push(mapperNode);
                    mapped = true;

                    pathDictionary = node.children;
                }
            });

            if(!mapped){
                
                //if not mapped by none parametric route, then map to the param route
                //node name would be the url segment

                pathDictionary.forEach(node => {
                    
                    if(node.name.charAt(0) === ":"){
                    
                        var mapperNode = {
                            name: decodeURI(url[i]),
                            children: node.children
                        }

                        this.map.push(mapperNode);

                        mapped = true;
                        
                        pathDictionary = node.children;
                        
                    }
                });
            }

            i++;

        }
    }
}