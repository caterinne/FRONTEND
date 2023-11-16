import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/guards/login.service';
import { AddConvenioComponent } from '../add-convenio/add-convenio.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private router: Router,
    public loginService: LoginService,
    private http: HttpClient,
    public dialog: MatDialog,


  ) {}

  agregarConvenio() {
    this.router.navigate(['/add-convenio']);
    console.log(this.router.url);
  }

  agregarInstitucion() {
    this.router.navigate(['/add-institucion']);
    console.log(this.router.url);
  }

  agregarCoordinador() {
    this.router.navigate(['/add-coordinador']);
    console.log(this.router.url);
  }

  agregarUsuario() {
    this.router.navigate(['/add-usuario']);
    console.log(this.router.url);
  }

  Principal() {
    this.router.navigate(['/page']);
    console.log(this.router.url);
  }
  logout() {
    this.loginService.logout(); // Llama al método logout del servicio
  }
  select(event: Event) {
    const selected = (event.target as HTMLSelectElement).value;
    if (selected === 'convenio') {
        this.agregarConvenio();
    } else if (selected === 'institucion') {
      this.agregarInstitucion();
    } else if (selected === 'coordinador') {
      this.agregarCoordinador();
    } else if (selected === 'usuario') {
      this.agregarUsuario();
    }
  } 

  getUserRole() {
    this.loginService.getUserRole();
  }
}
