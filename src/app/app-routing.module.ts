import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './components/page/page.component';
import { LoginComponent } from './components/login/login.component';
import { ConvenioDetalleComponent } from './components/convenio/convenio-detalle/convenio-detalle.component';
import { loginGuard } from 'src/guards/login.guard';
import { CoordinadorComponent } from './components/coordinador/coordinador.component';
import { InstitucionComponent } from './components/institucion/institucion.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { UsuarioComponent } from './components/usuario/usuario.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component:LoginComponent },
  { path: 'page', component: PageComponent, canActivate: [loginGuard]},
  { path: 'perfil', component: PerfilComponent, canActivate: [loginGuard]},
  { path: 'usuario', component: UsuarioComponent, canActivate: [loginGuard]},
  { path: 'convenio-detalle/:id', component: ConvenioDetalleComponent, canActivate: [loginGuard]},
  { path: 'coordinador', component: CoordinadorComponent, canActivate: [loginGuard]},
  { path: 'institucion', component: InstitucionComponent, canActivate: [loginGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
