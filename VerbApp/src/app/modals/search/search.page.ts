import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import * as Information from '../../../assets/JSON/information.json';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})


export class SearchPage implements OnInit {
  blank = '';
  query = '';
  matches = [];
  public selectedItem = '';
  selectedItemID = '';
  isDisabled = true;
  img = ''
  @Input() public conj_type: string;
  @Input() public options: any[];
  items_total = Information['default'];
  items = [];
  myColor = '#006400';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    console.log("this.options", this.options);
    this.matches = this.options;
    if (this.conj_type == "subject" || this.conj_type == "object"){
      this.matches.sort((a, b) => (a.id > b.id) ? 1 : -1);
    }else{
      this.matches.sort((a, b) => (a.translation > b.translation) ? 1 : -1);
    }
    this.formatSelected();
    for (let item of this.matches){
      if (item.type_color == ""){
        item.type_color = this.conj_type;
      }
    }
  }

  // Logs clicked verb
  selectItem(v) {
    if(this.selectedItemID != v.id){
      this.selectedItem = v;
      this.selectedItemID = v.id;
    } else{
      this.selectedItem = '';
      this.selectedItemID = '';
    }
    this.selectAbled()
    
  }

  formatSelected(){
    var r = (<HTMLElement>document.querySelector(':root'));
    let var_name = "--ion-color-" + this.conj_type;
    var rootStyle = getComputedStyle(r);
    let getColor = rootStyle.getPropertyValue(var_name);
    r.style.setProperty('--holder', getColor);
  }

  selectAbled(){
    if (this.selectedItem == ''){
      this.isDisabled = true;
    } else{
      this.isDisabled = false;
    }
  }

  // Linked to the OK button. Returns chosen verb OBJECT
  async closeModalWithData() {
    await this.modalController.dismiss(this.selectedItem);
  }

  // Linked to the cancel button. Returns no data.
  async closeModal() {
    await this.modalController.dismiss();
  }

  // Code taken from https://github.com/roedoejet/mothertongues-UI/blob/fv-template/src/pages/search/search.ts and then altered.
  matchTranslation() {
    const results = [];
    const re = new RegExp(this.query, 'i');
    for (let entry of this.options) {
      if (re.test(entry.translation)) {
        results.push(entry);
      }
    }
    const sortedAnswers = results.sort(function (a, b) {
      return a.translation.length - b.translation.length;
    });
    return (sortedAnswers);
  }

  matchBase() {
    const results = [];
    const re = new RegExp(this.query, 'i');
    for (let entry of this.options) {
      if (re.test(entry.base)) {
        results.push(entry);
      }
    }
    let sortedAnswers;
    if (results.length > 0){
    sortedAnswers = results.sort(function (a, b) {
      return a.base.length - b.base.length;
    });
  }else{
    sortedAnswers = [];
  }
    return (sortedAnswers);
  }


  // On keyup event, this function searches for relevant verbs. If event results on an empty search, will show all possibilities.
  getResults(event) {
    this.query = event.target.value;
    if (this.query.length > 0 ) {
      let t = this.matchTranslation();
      let b = this.matchBase();
      let results = b.concat(t);
      console.log(results);
      results = results.splice(0, results.length, ...(new Set(results)))
      this.matches = results;
    } else {
      this.matches = this.options;
    }
  }
}


