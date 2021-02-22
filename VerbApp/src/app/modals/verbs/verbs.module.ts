import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerbsPageRoutingModule } from './verbs-routing.module';

import { VerbsPage } from './verbs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerbsPageRoutingModule
  ],
  declarations: [VerbsPage]
})
export class VerbsPageModule {}
