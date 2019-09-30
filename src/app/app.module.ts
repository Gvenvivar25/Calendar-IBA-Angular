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
import {DictionariesModule} from './dictionaries/dictionaries.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReportsModule} from './reports/reports.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AlertComponent } from './shared/components/alert/alert.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JwtInterceptor} from './shared/helpers/jwt.interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './shared/services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SignInComponent,
    AlertComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    DictionariesModule,
    ReportsModule,
    AppRoutingModule,
    NgSelectModule,
    FullCalendarModule,

  ],
  providers: [AuthenticationService,
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
      ],
  bootstrap: [AppComponent]
})
export class AppModule { }
