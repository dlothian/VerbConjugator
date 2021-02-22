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
  @Input() public verb0: string;
  public selectedItem = '';
  selectedItemID = '';
  isDisabled = true;
  img = ''
  @Input() public conj_type: string;
  items_total = Information['default'];
  items = [];
  myColor = '#006400';

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    for (let item of this.items_total){
      if (item.name == this.conj_type){
        this.items = item.children;
      }
    }
    this.matches = this.items;
    this.matches.sort((a, b) => (a.translation > b.translation) ? 1 : -1);
    this.footerColor()
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

  // function currently searches for english items from the JSON file.
  // TODO: Add multilingual functionality
  // Code taken from https://github.com/roedoejet/mothertongues-UI/blob/fv-template/src/pages/search/search.ts and then altered.
  matchEnglish() {
    const results = [];
    const re = new RegExp(this.query, 'i');
    for (let entry of this.items) {
      if (re.test(entry.translation)) {
        results.push(entry);
      }
    }
    const sortedAnswers = results.sort(function (a, b) {
      return a.translation.length - b.translation.length;
    });
    return (sortedAnswers);
  }


  // On keyup event, this function searches for relevant items. If event results on an empty search, will show all possibilities.
  getResults(event) {
    this.query = event.target.value;
    if (this.query.length > 0 ) {
      this.matches = this.matchEnglish();
    } else {
      this.matches = this.items;
    }
  }

  footerColor(){
    if (this.conj_type == 'pre-verb'){
      this.myColor = '#006400'
    }
    if (this.conj_type == 'tense'){
      this.myColor = '#e6a800'
    }
    if (this.conj_type == 'order'){
      this.myColor = '#7851A9'
    }
    if (this.conj_type == 'subject'){
      this.myColor = '#BB3F96'
    }
    if (this.conj_type == 'object'){
      this.myColor = '#C53433'
    }
  }
}


