import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerbTooltipPageRoutingModule } from './verb-tooltip-routing.module';

import { VerbTooltipPage } from './verb-tooltip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerbTooltipPageRoutingModule
  ],
  declarations: [VerbTooltipPage]
})
export class VerbTooltipPageModule {}
