import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';

import { ScrollPanelModule } from 'primeng/scrollpanel';

//Configuracion del locale de la app
import localeEsAR from '@angular/common/locales/es-AR'
import localeJa from '@angular/common/locales/ja'
import localeIt from '@angular/common/locales/it'

import { registerLocaleData } from '@angular/common';

registerLocaleData( localeEsAR );
registerLocaleData( localeJa );
registerLocaleData( localeIt );

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ScrollPanelModule,
    SharedModule
  ],
  providers: [
    {
      provide: LOCALE_ID, useValue: 'es-AR'
    },
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
