import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordianComponent } from './accordian/accordian.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [AccordianComponent],
  imports: [
    CommonModule, 
    IonicModule
  ], 
  exports: [AccordianComponent]
})
export class SharedComponentsModule {}
