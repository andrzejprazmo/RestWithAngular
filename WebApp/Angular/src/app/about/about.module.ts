import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationService } from '../localization/services/localization.service';
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
    LocalizationModule.forRoot({
      fileExtensions: 'json',
      localizationUrl: './assets/i18n'
    }),
  ],
  providers: []
})
export class AboutModule { 
  constructor(localization: LocalizationService, language: LanguageService) {
    localization.load('about', ['pl', 'en']).subscribe(() => {
      localization.use(language.getLanguage());
    })
  }
}
