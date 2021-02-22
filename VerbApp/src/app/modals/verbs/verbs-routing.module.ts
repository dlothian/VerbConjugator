import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerbsPage } from './verbs.page';

const routes: Routes = [
  {
    path: '',
    component: VerbsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerbsPageRoutingModule {}
