import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationLoaderConfig, LocalizationService } from '../localization/services/localization.service';
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
  get loaders(): LocalizationLoaderConfig[] {
    return [
      { lang: 'pl', url: './assets/i18n/dashboard/pl.json' },
      { lang: 'en', url: './assets/i18n/dashboard/en.json' },
    ]
  }
  constructor(localization: LocalizationService, language: LanguageService) {
    localization.load(this.loaders).subscribe(() => {
      localization.use(language.getLanguage());
    })
  }
}
