import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PageComponent } from './components/page/page.component';

import { AppRoutingModule } from './app-routing.module';


import { HeaderComponent } from './components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgToastModule } from 'ng-angular-popup';
import { ConveniosComponent } from './components/convenios/convenios.component';
import { AddConvenioComponent } from './components/add-convenio/add-convenio.component';
import { AddCoordinadorComponent } from './components/add-coordinador/add-coordinador.component';
import { AddInstitucionComponent } from './components/add-institucion/add-institucion.component';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageComponent,

    HeaderComponent,
    ConveniosComponent,
    AddConvenioComponent,
    AddCoordinadorComponent,
    AddInstitucionComponent,
    AddUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    NgSelectModule,
    NgToastModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
