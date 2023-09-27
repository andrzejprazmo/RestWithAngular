import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './components/shared/shared.component';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationLoaderConfig, LocalizationService } from '../localization/services/localization.service';
import { LanguageService } from './services/language.service';

@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    LocalizationModule
  ],
  exports: [
    SharedComponent
  ],
  providers: [],

})

export class SharedModule {

  get loaders(): LocalizationLoaderConfig[] {
    return [
      { lang: 'pl', url: './assets/i18n/shared/pl.json' },
      { lang: 'en', url: './assets/i18n/shared/en.json' },
    ]
  }

  constructor(localization: LocalizationService, language: LanguageService) {
    localization.load(this.loaders).subscribe(() => {
      localization.use(language.getLanguage());
    })
  }
}
