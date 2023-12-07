import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { PageComponent } from './components/page/page.component';
import { ConveniosComponent } from './components/convenio/convenios.component';
import { CUConvenioComponent } from './components/convenio/cu-convenio/cu-convenio.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { InstitucionComponent } from './components/institucion/institucion.component';
import { CUInstitucionComponent } from './components/institucion/cu-institucion/cu-institucion.component';
import { CoordinadorComponent } from './components/coordinador/coordinador.component';
import { CUCoordinadorComponent } from './components/coordinador/cu-coordinador/cu-coordinador.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { CUUsuarioComponent } from './components/usuario/cu-usuario/cu-usuario.component';
import { LoginComponent } from './components/login/login.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ConvenioDetalleComponent } from './components/convenio/convenio-detalle/convenio-detalle.component';
import { DatePipe } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PageComponent,
    ConveniosComponent,
    CUConvenioComponent,
    InstitucionComponent,
    CUInstitucionComponent,
    CoordinadorComponent,
    CUCoordinadorComponent,
    UsuarioComponent,
    CUUsuarioComponent,
    LoginComponent,
    PerfilComponent,
    ConvenioDetalleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule

  ],
  providers: [DatePipe, { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
