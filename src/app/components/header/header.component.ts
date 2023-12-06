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
    return this.loginService.getUserRole()?.toLowerCase() !== 'viewer';
  }

  disableOptions(): boolean {
    return this.loginService.getUserRole()?.toLowerCase() === 'viewer';
  }
  selectedOption: string = '';
  handleSelectChange(option: string): void {
    console.log('Se ha llamado agregar', option);
    this.selectedOption = option;
    switch (option) {
      case 'Convenio':
        this.addConveniosForm();
        break;
      case 'Institucion':
        this.addInstitucionForm();
        break;
      case 'Coordinador':
        this.addCoordinadorForm();
        break;
      case 'Usuario':
        this.addUsuarioForm();
        break;
      default:
        console.warn('Opción no reconocida:', option);
    }
  }
  
  handleDialogClose(): void {
    this.selectedOption = ''; // Restablecer selectedOption al cerrar cualquier diálogo
  }
  
  
  

  addConveniosForm(){
    const dialogRef = this.dialog.open(CUConvenioComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.handleDialogClose();
    });
  }

  addInstitucionForm(){
    const dialogRef = this.dialog.open(CUInstitucionComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.handleDialogClose();
    });
  }

  addCoordinadorForm(){
    const dialogRef = this.dialog.open(CUCoordinadorComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.handleDialogClose();
    });
  }

  addUsuarioForm(){
    const dialogRef = this.dialog.open(CUUsuarioComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.handleDialogClose();
    });
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

