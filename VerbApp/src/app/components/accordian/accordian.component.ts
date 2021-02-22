import { Component, OnInit, Input } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.scss'],
})
export class AccordianComponent implements OnInit {

  @Input('morph') morph: any;
  constructor(private toastCtrl: ToastController) { }

  ngOnInit() {}

async selectMorph(morph) {
  let toast = await this.toastCtrl.create({
    message: `Selected morph: $(morph.english)`
  });
  toast.present();
}

}

