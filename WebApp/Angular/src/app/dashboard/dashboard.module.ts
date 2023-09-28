import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationService } from '../localization/services/localization.service';
import { LanguageService } from '../shared/services/language.service';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    LocalizationModule
  ],
  providers: [],

})
export class DashboardModule {
  constructor(localization: LocalizationService, language: LanguageService) {
    localization.load('dashboard').subscribe(() => {
      localization.use(language.getLanguage());
    })
  }
}
