import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

// The other pages are the children of the menu, with the default navigating to the main conjugator function

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
      path: 'conjugator', loadChildren: () => import('../conjugator/conjugator.module').then( m => m.ConjugatorPageModule)
      },
      {
      path: 'instructions', loadChildren: () => import('../instructions/instructions.module').then( m => m.InstructionsPageModule)
      },
      {
      path: 'about', loadChildren: () => import('../about/about.module').then( m => m.AboutPageModule)
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/conjugator'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
