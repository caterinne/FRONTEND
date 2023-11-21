import { Component } from '@angular/core';
import { CUConvenioComponent } from '../convenio/cu-convenio/cu-convenio.component';
import { MatDialog } from '@angular/material/dialog';
import { CUInstitucionComponent } from '../institucion/cu-institucion/cu-institucion.component';
import { CUCoordinadorComponent } from '../coordinador/cu-coordinador/cu-coordinador.component';
import { CUUsuarioComponent } from '../usuario/cu-usuario/cu-usuario.component';
import { LoginService } from 'src/guards/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent {
  constructor(private dialog: MatDialog,  public loginService: LoginService, private router: Router){}

  addConveniosForm(){
    console.log('addConveniosForm called');
    this.dialog.open(CUConvenioComponent)
  }

  addInstitucionForm(){
    console.log('addInstitucionForm called');
    this.dialog.open(CUInstitucionComponent)
  }
  addCoordinadorForm(){
    console.log('addCoordinadorForm called');
    this.dialog.open(CUCoordinadorComponent)
  }
  addUsuarioForm(){
    console.log('addUsuarioForm called');
    this.dialog.open(CUUsuarioComponent)
  }

  getUserRole() {
    this.loginService.getUserRole();
  }

  goMainPage() {
    this.router.navigate(['/page']);
    console.log(this.router.url);
  }
  logout() {
    this.loginService.logout(); // Llama al método logout del servicio
  }

  goPerfil() {
    this.router.navigate(['/perfil']);
    console.log(this.router.url);
  }

  irAPagina(pagina: string): void {
    this.router.navigate([`/${pagina}`]);
  }
}
