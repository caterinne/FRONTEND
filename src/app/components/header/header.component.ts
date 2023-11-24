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
export class HeaderComponent{
  constructor(private dialog: MatDialog,  public loginService: LoginService, private router: Router){}
  
  showOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() !== 'no';
  }

  disableOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() === 'no';
  }


  handleSelectChange(event: Event): void {
    const selectedOption = (event.target as HTMLSelectElement).value;
    
    switch (selectedOption) {
        case 'convenio':
            this.addConveniosForm();
            break;
        case 'institucion':
            this.addInstitucionForm();
            break;
        case 'coordinador':
            this.addCoordinadorForm();
            break;
        case 'usuario':
            this.addUsuarioForm();
            break;
        default:
            break;
    }
}

  addConveniosForm(){
    console.log('addConveniosForm called');
    this.dialog.open(CUConvenioComponent);
  }

  addInstitucionForm(){
    console.log('addInstitucionForm called');
    this.dialog.open(CUInstitucionComponent);
  }

  addCoordinadorForm(){
    console.log('addCoordinadorForm called');
    this.dialog.open(CUCoordinadorComponent);
  }

  addUsuarioForm(){
    console.log('addUsuarioForm called');
    this.dialog.open(CUUsuarioComponent);
  }

  goMainPage() {
    if (this.router.url !== '/page') {
      this.router.navigate(['/page']);
    }
  }

  logout() {
    this.loginService.logout(); // Llama al método logout del servicio
  }

  goPerfil() {
    if (this.router.url !== '/perfil') {
      this.router.navigate(['/perfil']);
    }
  }

  irAPagina(pagina: string): void {
    this.router.navigate([`/${pagina}`]);
  }
}

