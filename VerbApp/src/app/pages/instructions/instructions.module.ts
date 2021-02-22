import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructionsPageRoutingModule } from './instructions-routing.module';

import { InstructionsPage } from './instructions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructionsPageRoutingModule
  ],
  declarations: [InstructionsPage]
})
export class InstructionsPageModule {}
