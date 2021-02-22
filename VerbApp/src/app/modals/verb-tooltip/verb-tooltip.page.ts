import { Component, OnInit, Input } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import * as ToolTipInfo from '../../../assets/JSON/tooltip.json';

@Component({
  selector: 'app-verb-tooltip',
  templateUrl: './verb-tooltip.page.html',
  styleUrls: ['./verb-tooltip.page.scss'],
})
export class VerbTooltipPage implements OnInit {

  @Input() public conj_type: string;
  tips = ToolTipInfo['default'];

  constructor(private modalController: ModalController) {
    console.log("constructor")
   }

  ngOnInit() {
    console.log(this.conj_type);
    console.log("tips",this.tips);
    // console.log("tip tense",this.tips.tense);

  }

  getTip(){
    let des = '';
    for (let tip of this.tips){
        if(tip.type == this.conj_type){
          des = tip.tip;
          break;
        }
    }
    return des;
  }

  async closeModal() {
    await this.modalController.dismiss();
  };

  

}


