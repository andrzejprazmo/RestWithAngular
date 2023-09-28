import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from './pipes/translate.pipe';
import { HttpClientModule } from '@angular/common/http';
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

}
