import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageComponent } from './components/page/page.component';
import { loginGuard } from 'src/guards/login.guard';
import { AddConvenioComponent } from './components/agregar/add-convenio/add-convenio.component';
import { AddCoordinadorComponent } from './components/agregar/add-coordinador/add-coordinador.component';
import { AddInstitucionComponent } from './components/agregar/add-institucion/add-institucion.component';
import { AddUsuarioComponent } from './components/agregar/add-usuario/add-usuario.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'page', component: PageComponent, canActivate: [loginGuard] },
  { path: 'add-convenio', component: AddConvenioComponent, canActivate: [loginGuard] },
  { path: 'add-coordinador', component: AddCoordinadorComponent, canActivate: [loginGuard] },
  { path: 'add-institucion', component: AddInstitucionComponent, canActivate: [loginGuard] },
  { path: 'add-usuario', component: AddUsuarioComponent, canActivate: [loginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
