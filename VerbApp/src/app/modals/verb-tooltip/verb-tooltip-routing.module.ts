import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerbTooltipPage } from './verb-tooltip.page';

const routes: Routes = [
  {
    path: '',
    component: VerbTooltipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerbTooltipPageRoutingModule {}
