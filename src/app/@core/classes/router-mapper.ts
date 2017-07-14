export class RouterMapper {
    
    children: any;

    constructor(routerConfig){

        var rootMapperNode = {
            name: "SWARM",
            children: []
        }

        routerConfig.forEach(node => {
            this.getChildren(node,rootMapperNode);
            console.log("--------------------");
        })

        console.log(rootMapperNode);
    }

    getChildren(routerNode,mapperNode) {
        if(routerNode.path){
            var node = {
                name: routerNode.path,
                children: []
            };
            mapperNode.children.push(node);
            if(routerNode.children){
                routerNode.children.forEach(child => {
                    this.getChildren(child,node);
                });
            }

        }
    }
}