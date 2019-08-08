import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
registerLocaleData(localeIt);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { CalendarModule } from 'angular-calendar';
import { DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { SchedulerModule } from 'angular-calendar-scheduler';
import {AppService} from './app.service';

import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {DictionariesModule} from './dictionaries/dictionaries.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    DictionariesModule,
    AppRoutingModule,


    CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
      }),
    SchedulerModule.forRoot({ locale: 'en', headerDateFormat: 'daysRange' }),
    MatProgressSpinnerModule

  ],
  providers: [AppService,
{ provide: LOCALE_ID, useValue: 'en-US' }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
