import { Injectable } from '@angular/core';
import * as Conjugation from '../../assets/JSON/conjugation.json';
import * as Information from '../../assets/JSON/information.json';
import * as JSONTree from '../../assets/JSON/category_tree.json';
import { grammarCat } from '../models/grammar-cat.model';
import { grammarCatItem } from '../models/grammar-cat-item.model';
import { Tree } from 'src/app/models/tree.model';
import { node } from "../models/node.model";


@Injectable({
  providedIn: 'root'
})
export class DataService {

  JsonTree = JSONTree['default'];
  conjugation_info = Conjugation['default']
  conjugations = this.conjugation_info[1]  // conjugation tree
  conj_order = this.conjugation_info[0]  // level order of conjugation tree
  setinformation: Array<grammarCat> = [];

  tree = new Tree(new node('root'));

  constructor() {
    this.loadInformation();
    for (let item of this.setinformation){
      item.cat.forEach(child=>{
        if(typeof child.type_color === 'undefined'){
          child.type_color = "";
        }
      }); 
    }
    this.setinformation[0].disabled = false;
    let root_node = this.tree.getRoot();
    this.buildTree(this.JsonTree, root_node);
  }

  

  loadInformation(){ 
    this.setinformation = Information['default'].map(item => {
      let catItem = item.children.map(child => {
        let item: grammarCatItem = {
          translation: child.translation,
          id: child.id,
          base: child.base,
          type_color: child.type_color
        }
        return item;
      });

      let cat: grammarCat = {
        name: item.name,
        cat: catItem,
        open: false,
        disabled: true,
    }
    return cat;
    });
  }

  buildTree(tree, upper_node){
    if(Array.isArray(tree)){
      tree.forEach(id  =>{
        let n_level_node = new node(id);
        upper_node.addChild(n_level_node);
      })
      return;
    }
    Object.keys(tree).forEach(id => {
      let n_level_node = new node(id);
      upper_node.addChild(n_level_node);
      if (typeof tree[id] !== 'undefined' &&  typeof tree[id] != "string"){
        this.buildTree(tree[id],n_level_node);
      }
    });
    return;
   }

  
  conjugate(chosenIds) {
    let results = [];
    console.log("chosenIds", chosenIds);
    console.log("typeof chosenIds", typeof chosenIds);
    let current_tree = this.conjugations;
    
    for (let item of this.conj_order){ // for each category type item
      console.log("current item", item);
      if (item == this.conj_order[this.conj_order.length-1]){ //if its the last item, its the conjugation
        console.log("item", item);
        results.push(current_tree); //return the current value at the last level
        break;  
      }
       for (let key of Object.keys(current_tree)){ //otherwise go through the current tree level
        console.log("key", key, "item", item, "chosenIds[item]", chosenIds[item]);
         if (key == chosenIds[item].id){ // if the leaf node is the same value as the chosen value
            current_tree = current_tree[key]; // start the next level of the tree
         }
       }
    }
  
    console.log("conjugation results", results);
    return results;
  }
  
}


