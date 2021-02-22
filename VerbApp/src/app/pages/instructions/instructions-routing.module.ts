import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructionsPage } from './instructions.page';

const routes: Routes = [
  {
    path: '',
    component: InstructionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructionsPageRoutingModule {}
