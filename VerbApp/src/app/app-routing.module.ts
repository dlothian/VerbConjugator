import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  // },
  // {
  //   path: 'verbs',
  //   loadChildren: () => import('./modals/verbs/verbs.module').then( m => m.VerbsPageModule)
  // },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'verb-tooltip',
    loadChildren: () => import('./modals/verb-tooltip/verb-tooltip.module').then( m => m.VerbTooltipPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./modals/search/search.module').then( m => m.SearchPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
