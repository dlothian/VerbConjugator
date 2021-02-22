import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConjugatorPage } from './conjugator.page';

const routes: Routes = [
  {
    path: '',
    component: ConjugatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConjugatorPageRoutingModule {}
