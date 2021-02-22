
export class node{
    private id: string;
    private parent: node;
    private children: Array<node> = [];

    constructor(id:string) {
        this.id = id;
    }

    // id getter and setter
    getId(){
        return this.id;
    }
    setId(newId: string){
        this.id = newId;
    }

    // parent getter and setter
    getParent(){
        return this.parent;
    }
    setParent(newParent: node){
        this.parent = newParent;
    }

    // children getters and setters
    getChildren() {
        return this.children;
    }
    getChild(childId: string){
        for (let i = 0; i < this.children.length; i++){
            if (this.children[i].getId() == childId){
                return this.children[i];
            }
        }
    }
    addChild(child: node){
        this.children.push(child);
    }

}