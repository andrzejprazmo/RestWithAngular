import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultLayoutComponent } from './components/default-layout/default-layout.component';
import { RouterModule } from '@angular/router';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CookieModule, CookieService } from 'ngx-cookie';
import { LocalizationModule } from '../localization/localization.module';
import { LocalizationLoaderConfig, LocalizationService } from '../localization/services/localization.service';
import { LanguageService } from '../shared/services/language.service';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    TopMenuComponent,
    FooterComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LocalizationModule,
    CookieModule.withOptions(),
  ],
  providers: [],

})
export class LayoutModule {
  get loaders(): LocalizationLoaderConfig[] {
    return [
      { lang: 'pl', url: './assets/i18n/main/pl.json' },
      { lang: 'en', url: './assets/i18n/main/en.json' },
    ]
  }

  constructor(localization: LocalizationService, language: LanguageService) {
    localization.load(this.loaders).subscribe(() => {
      localization.use(language.getLanguage());
    })
  }
}
