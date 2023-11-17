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

import { NgSelectModule } from '@ng-select/ng-select';
import { NgToastModule } from 'ng-angular-popup';
import { ConveniosComponent } from './components/convenios/convenios.component';
import { AddConvenioComponent } from './components/agregar/add-convenio/add-convenio.component';
import { AddCoordinadorComponent } from './components/agregar/add-coordinador/add-coordinador.component';
import { AddInstitucionComponent } from './components/agregar/add-institucion/add-institucion.component';
import { AddUsuarioComponent } from './components/agregar/add-usuario/add-usuario.component';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material/dialog';
import { ConvenioDetalleComponent } from './components/convenios/convenio-detalle/convenio-detalle.component';

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
    ConvenioDetalleComponent,
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
    MatIconModule,
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
