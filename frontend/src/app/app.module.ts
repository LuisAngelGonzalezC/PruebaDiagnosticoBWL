import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
//layouts
import { AuthLayoutComponent } from './pages/layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './pages/layouts/dashboard-layout/dashboard-layout.component';
//pages
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UsersComponent } from './pages/users/users.component';
import { WheatherComponent } from './components/wheather/wheather.component';
import { CountryComponent } from './components/country/country.component';
import { TimezoneComponent } from './components/timezone/timezone.component';
import { ClockComponent } from './components/clock/clock.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    DashboardLayoutComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    UsersComponent,
    WheatherComponent,
    CountryComponent,
    TimezoneComponent,
    ClockComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
