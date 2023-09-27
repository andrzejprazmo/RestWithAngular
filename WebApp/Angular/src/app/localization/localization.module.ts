import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LocalizationService, LocalizationServiceConfig } from './services/localization.service';
import { TranslateDirective } from './directives/translate.directive';



@NgModule({
  declarations: [
    TranslatePipe,
    TranslateDirective
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    TranslatePipe, TranslateDirective
  ]
})
export class LocalizationModule {
  public static forRoot(config: LocalizationServiceConfig): ModuleWithProviders<LocalizationModule> {
    return {
      ngModule: LocalizationModule,
      providers: [
        { provide: LocalizationServiceConfig, useValue: config  },
        LocalizationService,
      ]
    }
  }

}
