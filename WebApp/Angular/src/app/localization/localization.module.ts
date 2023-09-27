import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalePipe } from './pipes/locale.pipe';
import { HttpClientModule } from '@angular/common/http';
import { LocalizationService, LocalizationServiceConfig } from './services/localization.service';
import { LocalizationStore } from './services/localization.store.';



@NgModule({
  declarations: [
    LocalePipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    LocalePipe
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
