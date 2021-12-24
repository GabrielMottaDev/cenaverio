import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaskModule } from 'ngx-mask';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ClientesGridComponent } from './views/clientes-grid/clientes-grid.component';
import { ContactFormComponent } from './views/contact-form/contact-form.component';
import { NavbarComponent } from './views/navbar/navbar.component';
import { BubbleComponent } from './views/bubble/bubble.component';
import { LoaderComponent } from './views/loader/loader.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CookieModule } from 'ngx-cookie';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    ClientesGridComponent,
    ContactFormComponent,
    NavbarComponent,
    BubbleComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true
    }),
    HttpClientModule,
    FontAwesomeModule,
    CookieModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
