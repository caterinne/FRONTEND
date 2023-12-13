import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/guards/login.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  user: any;

  constructor(private loginService: LoginService, private router: Router, private location: Location) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.loginService.getUser().subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.error("Error al obtener el usuario:", error);
      }
    );
  }
  verUsuarios(): void {
    this.router.navigate(['/usuario']);
  }
  goBack(): void {
    this.location.back();
  }
}
