import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it';
import { NgSelectModule } from '@ng-select/ng-select';
registerLocaleData(localeIt);
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import {AppService} from './app.service';
import {DictionariesModule} from './dictionaries/dictionaries.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReportsModule} from './reports/reports.module';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SignInComponent,
    SignUpComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DictionariesModule,
    ReportsModule,
    AppRoutingModule,
    NgSelectModule,
    FullCalendarModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
