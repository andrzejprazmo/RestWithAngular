import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationLoaderConfig, LocalizationService } from '../localization/services/localization.service';
import { LanguageService } from '../shared/services/language.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule,
    LocalizationModule
  ],
  providers: []
})
export class AboutModule {
  get loaders(): LocalizationLoaderConfig[] {
    return [
      { lang: 'pl', url: './assets/i18n/about/pl.json' },
      { lang: 'en', url: './assets/i18n/about/en.json' },
    ]
  }
  constructor(localization: LocalizationService, language: LanguageService) {
    localization.load(this.loaders).subscribe(() => {
      localization.use(language.getLanguage());
    })
  }
}
