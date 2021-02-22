import {node} from "./node.model";

export class Tree {
    
    private root: node;
    
    constructor(root: node) {
        this.root = root;
    }

    getRoot(){
        return this.root;
    }
    setRoot(root: node){
        this.root = root;
    }
}