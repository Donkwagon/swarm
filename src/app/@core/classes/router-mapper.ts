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
        url.shift();
        
        var len = url.length;
        var i = 0;

        var nodeUrl = "";
        
        var pathDictionary = this.children;

        while(i < len){

            nodeUrl += "/" + url[i]

            var mapped = false;

            var mapperNode = null;

            //try mapping with constant paths first
            pathDictionary.forEach(node => {

                if(url[i] === node.name){
                    
                    mapperNode = {
                        name: node.name,
                        url: nodeUrl,
                        children: []
                    }

                    node.children.forEach(child =>{
                        if(child.name.charAt(0) !== ":"){
                            child.url = nodeUrl + "/" + child.name;
                            mapperNode.children.push(child);
                        }
                    });

                    mapped = true;

                    pathDictionary = node.children;
                }
            });

            //if not mapped by constant paths, then the url is the param path
            if(!mapped){
                
                //node name would be the uridecoded url segment

                pathDictionary.forEach(node => {
                    
                    if(node.name.charAt(0) === ":"){
                        
                        mapperNode = {
                            name: decodeURI(url[i]),
                            url: nodeUrl,
                            children: []
                        }

                        node.children.forEach(child =>{
                            if(child.name.charAt(0) !== ":"){
                                child.url = nodeUrl + "/" + child.name;
                                mapperNode.children.push(child);
                            }
                        });
                        

                        mapped = true;
                        
                        pathDictionary = node.children;
                        
                    }
                });
            }

            this.map.push(mapperNode)

            i++;

        }
    }


}