export class RouterMapper {
    name: string;
    children: any;
    count: number;
    map: any[];

    constructor(name,routerConfig){
        this.name = name;
        this.children = [];
        this.count = 0;

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
        url = url.split("/");
        console.log("map url");
        console.log(url);

        var mapSection = {
            name: this.name,
            children:[]
        };

        url.forEach(e => {
            this.children.forEach(el => {
                if(e === el.name){
                    var sectionChildren = [];
                    el.children.forEach(child => {
                        sectionChildren.push
                    });
                    var mapSection = {

                    }
                }
            });
        });
    }
}