import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { grammarCatItem } from '../../models/grammar-cat-item.model';
import { grammarCat } from '../../models/grammar-cat.model';
import { BehaviorSubject, Observable, timer } from 'rxjs';
// import { VerbsPage } from '../../modals/verbs/verbs.page';
import { SearchPage } from '../../modals/search/search.page';
import { node } from "../../models/node.model";
import { VerbTooltipPage } from '../../modals/verb-tooltip/verb-tooltip.page';



@Component({
  selector: 'app-conjugator',
  templateUrl: './conjugator.page.html',
  styleUrls: ['./conjugator.page.scss']
})

export class ConjugatorPage implements OnInit {
  public verb0: any;
  public selectedType: any;

  open = '../../../assets/minusicon.png';
  closed = '../../../assets/plusicon.png';

  result = '';
  showVerb = '';
  selectedValues: any[];
  automaticClose = false;
  myFunInformation$ = new BehaviorSubject(this.service.information);
  selectedOptions: { [id: string]: { translation, id } } = {};

  selectedPath: { [id: string]: node} = {};

  constructor(private modalController: ModalController, private service: DataService) { }

  ngOnInit() {
    this.myFunInformation$.subscribe(data =>{
      this.service.setinformation = data;
    }
    );
    this.myFunInformation$.next(this.service.setinformation);

    //Creates the array that contains the selected keys
    this.service.information.forEach(element => {
      let key = element.name;
      this.selectedOptions[key] = {
        translation: '',
        id: '',
      };
    });
    return 
  };



  getContent() {
    return document.querySelector('ion-content');
  }

  scrollToBottom() {
    this.getContent().scrollToBottom(500);
  }


  updateDisabled(pos,index: number){
    /* 
    This function handles tasks relating to enabling and disabling available categories.
    Returns none
    */

    let i = index + 1
    this.disableLowerCat(i); // IMPORTANT: Disable must ALWAYS come before able, otherwise it will not enable the lower category
    this.ableCat(i);
  }

  updatePath(pos, index:number, selected){
    /*Function updates the path and the information for the follow category 
    pos is current cat
    index is the pos index
    selected is the selected option 
    */


    let prev_pos;
    let n;

    if (index == 0){
      prev_pos = pos;
      let root = this.service.tree.getRoot();
      n = root.getChild(selected.id);
    } else{
      prev_pos = this.service.information[index - 1].name;
      n = this.selectedPath[prev_pos].getChild(selected.id);
    }
    console.log("should be node", n);
    this.updateNodePath(n, pos);
    console.log("Updated Path", this.selectedPath);
    this.updateInformation(index+1, pos)
  }


  ableCat(index: number){
    /*
    This function takes in an index and enables the next category
    to be accessible.
    */
    if (index < this.service.information.length){
      this.service.information[index].disabled = false;
      this.myFunInformation$.next(this.service.information);
    }
  }

  disableLowerCat(index: number){
    /*
    This function takes in an index and disables all categories lower than that, 
    so that the user cannot change a previous category without resetting the below categories.
    */
    
    let key: string;
    for(let i = index; i < this.service.information.length; i ++){ // find all categories at a lower index
      key = this.service.information[i].name; // get the name
      this.selectedOptions[key] = {translation: '', id: ''};  // reset so that there is no selected option at that name
      this.service.information[i].disabled=true; // disable access
    }
    console.log(this.selectedOptions);
  }

  

  setSelected(pos, selected) {
    /* 
    This function takes in the category name (pos as in part of speech)
    */
    this.selectedOptions[pos].translation = selected.translation;
    this.selectedOptions[pos].id = selected.id;
  }


  updateNodePath(n: node, pos: string) {
    /*Updates path at the current cateogry with the newly created node object
    n is the newly created node object
    pos is the current category
     */
    this.selectedPath[pos] = n;
    console.log("this.selectedPath[pos]", this.selectedPath[pos]);
  }


  updateInformation(index: number, pos:string) {
    this.service.information[index].cat = [];
    let selectFrom = this.service.setinformation[index].cat;
    let children = this.selectedPath[pos].getChildren();
    selectFrom.forEach(element => {
      for (let i = 0; i < children.length; i++) {
        if (children[i].getId() == element.id){
          this.service.information[index].cat.push(element);
          break;
        }
      }
    });
    this.myFunInformation$.next(this.service.information);
  }

  Conjugate(){
    let results = this.service.conjugate(this.selectedOptions);
    let s = '';
    for (let r of results){
      s += r.toString();
      s += ' ';
    }
    this.result = s;
    this.scrollToBottom();
  }


  async openModalSearch(whichSearch, index) {
    const modal = await this.modalController.create({
      component: SearchPage,
      componentProps: {
        'conj_type':whichSearch
      }
    });


    modal.onWillDismiss().then(dataReturned => {
      // trigger when about to close the modal
      if (dataReturned != null || dataReturned != undefined){
        if (dataReturned.data.id.length > 0) { // if something was returned, set it as the selected option
          this.selectedOptions[whichSearch].translation = dataReturned.data.id;
          this.selectedOptions[whichSearch].id = dataReturned.data.id;
          this.updateDisabled(whichSearch,index);
          this.updatePath(whichSearch,index, dataReturned.data);
        }
      }
      console.log('Receive: ', dataReturned.data);
    });

    // Currently does actively send information, but could be a useful feater that if a user already picked a verb that it
    // appears in the search when they search again (?)
    return await modal.present().then(_ => {
    });
  }

  async openModalToolTip(whichtip) {
    // with data
    console.log("Tooltip pressed", whichtip);
    const modal = await this.modalController.create({
      
      component: VerbTooltipPage,
      componentProps: {
        'conj_type':whichtip
      }
      
    });
    modal.onWillDismiss().then(dataReturned => {
    });

    return await modal.present().then(_ => {
    });
  }



  ngOnDestory() {
    this.myFunInformation$.unsubscribe();
  }


  // chooseOpen(open: boolean){
  //   if (open){
  //     return this.open;
  //   }else{
  //     return this.closed;
  //   }
  // }

  // toggleSection(index) {
  //   this.service.information[index].open = !this.service.information[index].open;
  //   if (this.automaticClose && this.service.information[index].open) {
  //     this.service.information
  //       .filter((item, itemIndex) => itemIndex != index)
  //       .map(item => item.open = false);
  //   };
  // };


  // toggleItem(index, childIndex) {
    
  //   let pos = this.service.information[index].name;
  //   let prev_pos;
  //   if (index == 0){
  //     prev_pos = pos;
  //   } else{
  //     prev_pos = this.service.information[index - 1].name;
  //   }

  //   let selected = this.service.information[index].cat[childIndex];
  //   this.setSelected(pos, selected);
  //   this.service.information[index].open = false;
  //   // this.ableCat(index+1);
  //   // let n = this.selectedPath[prev_pos].getChild(selected.id);
  //   // this.updateNodePath(n, pos);
  //   // this.disableLowerCat(index+1);
  //   // this.updateInformation(index+1, pos)
    
  // }

}
