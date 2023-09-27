import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './components/shared/shared.component';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationService } from '../localization/services/localization.service';
import { LanguageService } from './services/language.service';

@NgModule({
  declarations: [
    SharedComponent
  ],
  imports: [
    CommonModule,
    LocalizationModule.forRoot({
      fileExtensions: 'json',
      localizationUrl: './assets/i18n',
    }),
  ],
  exports: [
    SharedComponent
  ],
  providers: [],

})
export class SharedModule {
  constructor(localization: LocalizationService, language: LanguageService) {
    localization.load('shared', ['pl', 'en']).subscribe(() => {
      localization.use(language.getLanguage());
    })
  }
}
