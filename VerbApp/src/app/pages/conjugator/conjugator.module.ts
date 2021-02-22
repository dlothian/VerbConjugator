import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConjugatorPageRoutingModule } from './conjugator-routing.module';

import { ConjugatorPage } from './conjugator.page';
import { VerbsPage } from '../../modals/verbs/verbs.page';
import { SharedComponentsModule } from 'src/app/components/shared-components.module';
import { VerbsPageModule } from 'src/app/modals/verbs/verbs.module';
import { VerbTooltipPageModule } from 'src/app/modals/verb-tooltip/verb-tooltip.module';
import { VerbTooltipPage } from '../../modals/verb-tooltip/verb-tooltip.page';
import { SearchPage } from '../../modals/search/search.page';
import { SearchPageModule } from 'src/app/modals/search/search.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConjugatorPageRoutingModule,
    SharedComponentsModule,
    VerbsPageModule,
    VerbTooltipPageModule, 
    SearchPageModule
  ],
  declarations: [ConjugatorPage],
  entryComponents: [VerbsPage, VerbTooltipPage, SearchPage]
})
export class ConjugatorPageModule {}
