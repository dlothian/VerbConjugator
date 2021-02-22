import * as Information from '../../../assets/JSON/information.json';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';


@Component({
  selector: 'app-verbs',
  templateUrl: './verbs.page.html',
  styleUrls: ['./verbs.page.scss'],
})


export class VerbsPage implements OnInit {
  blank = '';
  query = '';
  matches = [];
  items_total = Information['default'];
  @Input() public verb0: string;
  public selectedVerb = '';
  selectedVerbID = '';
  isDisabled = true;
  img = ''
  VTI = '../../../assets/manchairemoji.png';
  VII = '../../../assets/chairemoji.png';
  VTA = '../../../assets/menemoji.png';
  VAI = '../../../assets/manemoji.png';
  verbs = [];



  constructor(private modalController: ModalController) {

    for (let item of this.items_total){
      if (item.name == 'verb'){
        this.verbs = item.children;
      }
    }
    this.matches = this.verbs;

    this.matches = this.verbs;
    this.matches.sort((a, b) => (a.translation > b.translation) ? 1 : -1);
  }

  ngOnInit() {}

  // Logs clicked verb
  selectVerb(v) {
    if(this.selectedVerbID != v.id){
      this.selectedVerb = v;
      this.selectedVerbID = v.id;
    } else{
      this.selectedVerb = '';
      this.selectedVerbID = '';
    }
    this.selectAbled()
    
  }

  selectAbled(){
    if (this.selectedVerb == ''){
      this.isDisabled = true;
    } else{
      this.isDisabled = false;
    }
  }

  // Linked to the OK button. Returns chosen verb OBJECT
  async closeModalWithData() {
    await this.modalController.dismiss(this.selectedVerb);
  }

  // Linked to the cancel button. Returns no data.
  async closeModal() {
    await this.modalController.dismiss();
  }

  chooseImage(type) {
    let img = ''
    // console.log(type);
    if (type === "VTI") {
      img = this.VTI;

    } else if (type === "VII") {
      img = this.VII;
    } else if (type == "VTA") {
      img = this.VTA;
    } else {
      img = this.VAI;
    }
    // console.log(img);
    return img;
  }

  chooseVerbType(type) {
    let t = '';
    // console.log(type);
    if (type === "VTI") {
      t = "awa ooma";

    } else if (type === "VII") {
      t = "ooma";
    } else if (type == "VTA") {
      t = "awa awa";
    } else {
      t = "awa";
    }
    // console.log(img);
    return t;
  }

  // function currently searches for english verbs from the JSON file.
  // TODO: Add multilingual functionality
  // Code taken from https://github.com/roedoejet/mothertongues-UI/blob/fv-template/src/pages/search/search.ts and then altered.
  matchEnglish() {
    const results = [];
    const re = new RegExp(this.query, 'i');
    for (let entry of this.verbs) {
      if (re.test(entry.translation)) {
        results.push(entry);
      }
    }
    const sortedAnswers = results.sort(function (a, b) {
      return a.verb.length - b.verb.length;
    });
    return (sortedAnswers);
  }


  // On keyup event, this function searches for relevant verbs. If event results on an empty search, will show all possibilities.
  getResults(event) {
    this.query = event.target.value;
    if (this.query.length > 0 ) {
      this.matches = this.matchEnglish();
    } else {
      this.matches = this.verbs;
    }
  }
}
